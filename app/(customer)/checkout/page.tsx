'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, Truck, User, Lock } from 'lucide-react';
import { Button, Input, Select } from '@/components/ui';
import { toast } from '@/components/ui/toast';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { formatPrice, getCountries, isValidEmail } from '@/lib/utils';
import type { CheckoutFormData } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShippingCost, getTotal, clearCart } = useCart();
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    phone: '',
    first_name: '',
    last_name: '',
    street: '',
    city: '',
    postal_code: '',
    country: 'ES',
    notes: '',
    create_account: false,
    password: '',
  });

  // Pre-fill with user data if logged in
  useEffect(() => {
    if (user && profile) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
      }));
    }
  }, [user, profile]);

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateStep1 = () => {
    if (!formData.email || !isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone) {
      toast.error('Please enter your phone number');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.street ||
      !formData.city ||
      !formData.postal_code ||
      !formData.country
    ) {
      toast.error('Please fill in all shipping fields');
      return false;
    }
    if (formData.create_account && !user && !formData.password) {
      toast.error('Please enter a password for your account');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.product_id,
            variant_id: item.variant_id,
            quantity: item.quantity,
            ring_size: item.ring_size,
            diamond_carat: item.diamond_carat,
            selected_metal: item.selected_metal,
            stone_shape: item.stone_shape,
            customization_notes: item.customization_notes,
            product_name: item.product.name,
            unit_price:
              item.product.base_price +
              (item.variant?.price_adjustment || 0),
          })),
          shipping: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            street: formData.street,
            city: formData.city,
            postal_code: formData.postal_code,
            country: formData.country,
            phone: formData.phone,
          },
          email: formData.email,
          notes: formData.notes,
          create_account: formData.create_account && !user,
          password: formData.password,
          user_id: user?.id,
        }),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout using the URL
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to create checkout session');
        setLoading(false);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const subtotal = getSubtotal();
  const shipping = getShippingCost();
  const total = getTotal();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-h1 mb-8">{t('checkout.title')}</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            {[
              { num: 1, icon: User, label: 'Contact' },
              { num: 2, icon: Truck, label: 'Shipping' },
              { num: 3, icon: CreditCard, label: 'Payment' },
            ].map(({ num, icon: Icon, label }) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= num
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step >= num ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
                {num < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      step > num ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Contact */}
          {step === 1 && (
            <div className="bg-white rounded-lg border p-8">
              <h2 className="font-heading text-xl mb-6">
                {t('checkout.contact')}
              </h2>

              {!user && (
                <p className="text-sm text-muted-foreground mb-6">
                  Already have an account?{' '}
                  <Link href="/login?redirect=/checkout" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              )}

              <div className="space-y-6">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!!user}
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+34 612 345 678"
                />
              </div>

              <div className="mt-8">
                <Button onClick={handleNextStep} className="w-full">
                  Continue to Shipping
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="bg-white rounded-lg border p-8">
              <h2 className="font-heading text-xl mb-6">
                {t('checkout.shipping')}
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Last Name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  label="Street Address"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />

                <div className="grid md:grid-cols-3 gap-6">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    label="Postal Code"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    options={getCountries().map((c) => ({
                      value: c.code,
                      label: c.name,
                    }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Order Notes (optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Special instructions, gift message, etc."
                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                {!user && (
                  <div className="pt-4 border-t">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="create_account"
                        checked={formData.create_account}
                        onChange={handleChange}
                        className="rounded border-input"
                      />
                      <span className="text-sm">
                        Create an account for faster checkout
                      </span>
                    </label>

                    {formData.create_account && (
                      <div className="mt-4">
                        <Input
                          label="Password"
                          name="password"
                          type="password"
                          value={formData.password || ''}
                          onChange={handleChange}
                          required
                          helperText="Minimum 8 characters"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleNextStep} className="flex-1">
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Pay */}
          {step === 3 && (
            <div className="bg-white rounded-lg border p-8">
              <h2 className="font-heading text-xl mb-6">
                Review & {t('checkout.payment')}
              </h2>

              {/* Summary */}
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">Contact</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.email} · {formData.phone}
                  </p>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="font-medium mb-2">Ship to</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.first_name} {formData.last_name}
                    <br />
                    {formData.street}
                    <br />
                    {formData.city}, {formData.postal_code}
                    <br />
                    {
                      getCountries().find((c) => c.code === formData.country)
                        ?.name
                    }
                  </p>
                </div>

                {formData.notes && (
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-medium mb-2">Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment info */}
              <div className="p-4 border rounded-lg mb-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  You will be redirected to Stripe to complete your payment
                  securely.
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  loading={loading}
                  className="flex-1"
                  leftIcon={<CreditCard className="h-5 w-5" />}
                >
                  Pay {formatPrice(total)}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border p-6 sticky top-32">
            <h2 className="font-heading text-xl mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  key={`${item.product_id}-${item.variant_id}`}
                  className="flex gap-4"
                >
                  <div className="w-16 h-20 bg-muted rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(
                      (item.product.base_price +
                        (item.variant?.price_adjustment || 0)) *
                        item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pb-6 border-b">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
            </div>

            <div className="flex justify-between py-6 text-lg font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
