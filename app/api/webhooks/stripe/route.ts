import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderConfirmationEmail } from '@/lib/resend';

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;
      const orderNumber = session.metadata?.order_number;

      if (orderId) {
        // Update order status to paid
        const { error } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            stripe_payment_intent_id: session.payment_intent as string,
            stripe_customer_id: session.customer as string,
          })
          .eq('id', orderId);

        if (error) {
          console.error('Error updating order:', error);
        }

        // Fetch order details for email
        const { data: order } = await supabase
          .from('orders')
          .select(`
            *,
            items:order_items(*)
          `)
          .eq('id', orderId)
          .single();

        if (order) {
          // Fetch order items with product details
          const { data: orderItems } = await supabase
            .from('order_items')
            .select(`
              *,
              product:products(name)
            `)
            .eq('order_id', orderId);

          // Send order confirmation email
          const customerEmail = order.guest_email || session.customer_email;

          if (customerEmail) {
            try {
              await sendOrderConfirmationEmail({
                to: customerEmail,
                orderNumber: orderNumber!,
                customerName: order.shipping_first_name || 'Customer',
                items: (orderItems || []).map((item: any) => ({
                  name: item.product?.name || 'Product',
                  quantity: item.quantity,
                  price: item.unit_price,
                })),
                subtotal: order.subtotal,
                shipping: order.shipping_cost,
                total: order.total,
                shippingAddress: {
                  street: order.shipping_street,
                  city: order.shipping_city,
                  postalCode: order.shipping_postal_code,
                  country: order.shipping_country,
                },
              });
            } catch (emailError) {
              console.error('Error sending confirmation email:', emailError);
            }
          }
        }
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);

      // Could update order status or send notification
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
