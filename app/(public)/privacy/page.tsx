import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'KaraLITH privacy policy - how we collect, use, and protect your personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-h1 mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">
          Last updated: January 1, 2024
        </p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              KaraLITH ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website and make purchases.
            </p>
            <p className="text-muted-foreground">
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              2. Information We Collect
            </h2>
            <h3 className="font-medium text-lg mb-2">Personal Data</h3>
            <p className="text-muted-foreground mb-4">
              We may collect personal information that you voluntarily provide
              when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Create an account</li>
              <li>Make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us through forms or email</li>
              <li>Leave a product review</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              This information may include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4">
              <li>Name and contact information (email, phone, address)</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Order history and preferences</li>
              <li>Ring sizes and customization preferences</li>
            </ul>

            <h3 className="font-medium text-lg mb-2 mt-6">
              Automatically Collected Data
            </h3>
            <p className="text-muted-foreground">
              When you visit our site, we automatically collect certain
              information including your IP address, browser type, operating
              system, access times, and pages viewed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              4. Information Sharing
            </h2>
            <p className="text-muted-foreground mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>
                <strong>Service Providers:</strong> Third parties that help us
                operate our business (payment processors, shipping carriers,
                email services)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any
                merger or acquisition
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">5. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to enhance your
              experience on our site. You can control cookies through your
              browser settings. For more information, see our Cookie Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">6. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no method of
              transmission over the Internet is 100% secure. We cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              7. Your Rights (GDPR)
            </h2>
            <p className="text-muted-foreground mb-4">
              If you are a European resident, you have the right to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at
              privacy@karalith.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">8. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this policy, unless a longer
              retention period is required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our website is not intended for children under 16. We do not
              knowingly collect personal information from children under 16. If
              you believe we have collected such information, please contact us
              immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-heading text-h3 mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-h3 mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this privacy policy, please contact
              us:
            </p>
            <ul className="text-muted-foreground mt-4">
              <li>Email: privacy@karalith.com</li>
              <li>Address: Carrer de Valencia, 123, 08011 Barcelona, Spain</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
