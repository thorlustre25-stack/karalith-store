import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateOrderNumber } from '@/lib/utils';

interface CheckoutItem {
  product_id: string;
  variant_id: string | null;
  quantity: number;
  ring_size: string | null;
  customization_notes: string | null;
  product_name: string;
  unit_price: number;
}

interface ShippingAddress {
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
}

interface CheckoutRequest {
  items: CheckoutItem[];
  shipping: ShippingAddress;
  email: string;
  notes: string;
  create_account: boolean;
  password?: string;
  user_id?: string;
}

export async function POST(request: Request) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, shipping, email, notes, create_account, password, user_id } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const orderNumber = generateOrderNumber();

    // Calculate totals
    const subtotal = items.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );
    const shippingCost = subtotal >= 150 ? 0 : 15;
    const total = subtotal + shippingCost;

    // Create user account if requested
    let newUserId = user_id;
    if (create_account && password && !user_id) {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          first_name: shipping.first_name,
          last_name: shipping.last_name,
        },
      });

      if (authError) {
        console.error('Error creating user:', authError);
      } else {
        newUserId = authData.user?.id;
      }
    }

    // Create address if user exists
    let addressId: string | null = null;
    if (newUserId) {
      const { data: address } = await supabase
        .from('addresses')
        .insert({
          user_id: newUserId,
          first_name: shipping.first_name,
          last_name: shipping.last_name,
          street: shipping.street,
          city: shipping.city,
          postal_code: shipping.postal_code,
          country: shipping.country,
          phone: shipping.phone,
          is_default: true,
        })
        .select()
        .single();

      addressId = address?.id || null;
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: newUserId || null,
        guest_email: !newUserId ? email : null,
        guest_phone: !newUserId ? shipping.phone : null,
        status: 'pending',
        subtotal,
        shipping_cost: shippingCost,
        total,
        shipping_address_id: addressId,
        shipping_first_name: shipping.first_name,
        shipping_last_name: shipping.last_name,
        shipping_street: shipping.street,
        shipping_city: shipping.city,
        shipping_postal_code: shipping.postal_code,
        shipping_country: shipping.country,
        shipping_phone: shipping.phone,
        notes,
      })
      .select()
      .single();

    if (orderError || !order) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
      customization_notes: item.customization_notes,
      ring_size: item.ring_size,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      client_reference_id: order.id,
      metadata: {
        order_id: order.id,
        order_number: orderNumber,
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.product_name,
            metadata: {
              product_id: item.product_id,
              variant_id: item.variant_id || '',
            },
          },
          unit_amount: Math.round(item.unit_price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingCost * 100,
              currency: 'eur',
            },
            display_name: shippingCost === 0 ? 'Free Shipping' : 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?order=${orderNumber}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    });

    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({ stripe_payment_intent_id: session.id })
      .eq('id', order.id);

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
