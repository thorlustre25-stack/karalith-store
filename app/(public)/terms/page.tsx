import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'KaraLITH terms and conditions of use and sale.',
};

export default function TermsPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-h1 mb-8">Terms & Conditions</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: January 1, 2024
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              These Terms and Conditions govern your use of the KaraLITH website
              and your purchase of products from us. By accessing our website or
              placing an order, you agree to be bound by these terms. Please
              read them carefully before using our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>
                <strong>"KaraLITH," "we," "us," "our"</strong> refers to
                KaraLITH S.L., registered in Barcelona, Spain.
              </li>
              <li>
                <strong>"Website"</strong> refers to www.karalith.com and all
                associated pages.
              </li>
              <li>
                <strong>"Products"</strong> refers to all jewelry items offered
                for sale on our website.
              </li>
              <li>
                <strong>"Customer," "you," "your"</strong> refers to any person
                placing an order or using our website.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">3. Products & Pricing</h2>
            <p className="text-muted-foreground mb-4">
              3.1. All products displayed on our website are subject to
              availability. We reserve the right to discontinue any product at
              any time.
            </p>
            <p className="text-muted-foreground mb-4">
              3.2. Prices are displayed in Euros (EUR) and include VAT where
              applicable. Shipping costs are calculated at checkout.
            </p>
            <p className="text-muted-foreground mb-4">
              3.3. We make every effort to display product images accurately.
              However, slight variations in color may occur due to monitor
              settings.
            </p>
            <p className="text-muted-foreground">
              3.4. We reserve the right to modify prices at any time. The price
              applicable to your order is the price displayed at the time of
              purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">4. Orders & Payment</h2>
            <p className="text-muted-foreground mb-4">
              4.1. By placing an order, you are making an offer to purchase our
              products. We may accept or decline your order at our discretion.
            </p>
            <p className="text-muted-foreground mb-4">
              4.2. An order confirmation email does not constitute acceptance.
              Acceptance occurs when we ship the product.
            </p>
            <p className="text-muted-foreground mb-4">
              4.3. We accept payment via credit card (Visa, MasterCard, American
              Express) processed securely through Stripe.
            </p>
            <p className="text-muted-foreground">
              4.4. Payment is taken at the time of order. Your order will not be
              processed until payment is received in full.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              5. Shipping & Delivery
            </h2>
            <p className="text-muted-foreground mb-4">
              5.1. We ship to most countries worldwide. Shipping costs and
              delivery times vary by destination.
            </p>
            <p className="text-muted-foreground mb-4">
              5.2. Estimated delivery times are provided for guidance only and
              are not guaranteed. Delays may occur due to customs or shipping
              carrier issues.
            </p>
            <p className="text-muted-foreground mb-4">
              5.3. Risk of loss passes to you upon delivery. We recommend
              requiring a signature on delivery for valuable items.
            </p>
            <p className="text-muted-foreground">
              5.4. International orders may be subject to customs duties and
              taxes, which are the responsibility of the customer.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              6. Returns & Refunds
            </h2>
            <p className="text-muted-foreground mb-4">
              6.1. We offer a 30-day return policy for unworn items in their
              original packaging.
            </p>
            <p className="text-muted-foreground mb-4">
              6.2. Custom orders and personalized items (including engraved
              pieces) cannot be returned unless there is a manufacturing defect.
            </p>
            <p className="text-muted-foreground mb-4">
              6.3. To initiate a return, contact our customer service. Return
              shipping costs are the responsibility of the customer unless the
              item is defective.
            </p>
            <p className="text-muted-foreground">
              6.4. Refunds will be processed within 14 days of receiving the
              returned item and will be credited to the original payment method.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">7. Warranty</h2>
            <p className="text-muted-foreground mb-4">
              7.1. All KaraLITH products come with a 2-year warranty against
              manufacturing defects.
            </p>
            <p className="text-muted-foreground mb-4">
              7.2. The warranty covers: loose stones (not due to damage), broken
              clasps, and structural defects under normal wear.
            </p>
            <p className="text-muted-foreground">
              7.3. The warranty does not cover: damage from accidents, misuse,
              or improper care; normal wear and tear; scratches or tarnishing;
              resizing or alterations performed by third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">8. Custom Orders</h2>
            <p className="text-muted-foreground mb-4">
              8.1. Custom orders require a 50% deposit before work begins. The
              remaining balance is due before shipping.
            </p>
            <p className="text-muted-foreground mb-4">
              8.2. Deposits for custom orders are non-refundable once design
              work has begun.
            </p>
            <p className="text-muted-foreground">
              8.3. Delivery times for custom orders are estimates only and may
              vary based on design complexity.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              9. Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              All content on this website, including images, text, designs, and
              logos, is the property of KaraLITH and is protected by copyright
              and trademark laws. Unauthorized use is prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              10. Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, KaraLITH shall not be
              liable for any indirect, incidental, or consequential damages
              arising from your use of our website or products.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              11. Governing Law
            </h2>
            <p className="text-muted-foreground">
              These terms are governed by the laws of Spain. Any disputes shall
              be subject to the exclusive jurisdiction of the courts of
              Barcelona, Spain.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">12. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting to the website.
              Continued use of the website constitutes acceptance of modified
              terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 mb-4">13. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these terms, please contact us:
            </p>
            <ul className="text-muted-foreground mt-4">
              <li>Email: legal@karalith.com</li>
              <li>Address: Carrer de Valencia, 123, 08011 Barcelona, Spain</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
