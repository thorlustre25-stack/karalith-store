'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { Button, Input, Textarea, Select } from '@/components/ui';
import { toast } from '@/components/ui/toast';

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'custom', label: 'Custom Order Request' },
  { value: 'support', label: 'Order Support' },
  { value: 'wholesale', label: 'Wholesale Inquiry' },
  { value: 'press', label: 'Press & Media' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry_type: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      'Message sent!',
      'We will get back to you within 24-48 hours.'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiry_type: '',
      message: '',
    });
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-h1 mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a question about our jewelry or need assistance with an order?
          We're here to help.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="bg-secondary/20 rounded-lg p-8">
            <h2 className="font-heading text-xl mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a
                    href="mailto:thor.karalith@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    thor.karalith@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <a
                    href="tel:+34612345678"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +34 612 345 678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    Carrer de Valencia, 123
                    <br />
                    08011 Barcelona, Spain
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Hours</h3>
                  <p className="text-muted-foreground">
                    Mon - Fri: 10:00 - 18:00
                    <br />
                    Sat: 11:00 - 16:00
                    <br />
                    Sun: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <h3 className="font-medium mb-3">Custom Orders</h3>
              <p className="text-sm text-muted-foreground">
                Looking for something unique? We specialize in custom jewelry
                design. Contact us to discuss your vision.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-8">
            <h2 className="font-heading text-xl mb-6">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 612 345 678"
                />
                <Select
                  label="Inquiry Type"
                  name="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={handleChange}
                  options={inquiryTypes}
                  placeholder="Select type..."
                />
              </div>

              <Textarea
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
                rows={5}
              />

              <Button
                type="submit"
                loading={loading}
                leftIcon={<Send className="h-4 w-4" />}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-12 rounded-lg overflow-hidden">
        <div className="bg-muted h-[400px] flex items-center justify-center">
          <p className="text-muted-foreground">
            Interactive map would go here
          </p>
        </div>
      </div>
    </div>
  );
}
