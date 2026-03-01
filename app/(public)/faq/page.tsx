'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

const faqCategories = [
  {
    name: 'Orders & Shipping',
    faqs: [
      {
        question: 'How long does shipping take?',
        answer:
          'Standard shipping within Spain takes 2-4 business days. European shipping takes 5-7 business days, and international shipping takes 7-14 business days. Express shipping options are available at checkout.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. You can see the exact cost at checkout after entering your address.',
      },
      {
        question: 'How can I track my order?',
        answer:
          'Once your order ships, you will receive an email with a tracking number. You can use this number to track your package on the carrier\'s website, or log into your account to see the latest status.',
      },
      {
        question: 'What is your return policy?',
        answer:
          'We offer a 30-day return policy for unworn items in their original packaging. Custom orders and personalized items cannot be returned unless there is a defect. Contact us to initiate a return.',
      },
    ],
  },
  {
    name: 'Products & Materials',
    faqs: [
      {
        question: 'Are your diamonds ethically sourced?',
        answer:
          'Yes, all our diamonds are conflict-free and certified by leading gemological institutes (GIA, IGI). We work only with suppliers who adhere to the Kimberley Process and maintain strict ethical standards.',
      },
      {
        question: 'What metals do you use?',
        answer:
          'We use 18k gold (yellow, white, and rose), and platinum. All our precious metals are 100% recycled, reducing the environmental impact of new mining.',
      },
      {
        question: 'What does VS and IF diamond grade mean?',
        answer:
          'VS (Very Slightly Included) diamonds have minor inclusions that are difficult to see under 10x magnification. IF (Internally Flawless) diamonds have no inclusions visible under 10x magnification, making them rarer and more valuable.',
      },
      {
        question: 'Are your pieces handmade?',
        answer:
          'Yes, all KaraLITH jewelry is handcrafted by our skilled artisans in our Barcelona atelier. This ensures each piece receives individual attention and meets our exacting quality standards.',
      },
    ],
  },
  {
    name: 'Ring Sizing',
    faqs: [
      {
        question: 'How do I find my ring size?',
        answer:
          'Visit our Ring Size Guide for detailed instructions on measuring your finger at home. You can use a string or paper method, or measure an existing ring that fits well.',
      },
      {
        question: 'Can you resize a ring after purchase?',
        answer:
          'Yes, we offer complimentary resizing within 30 days of purchase for most ring styles. Some designs with continuous settings may have limited sizing options. Contact us to discuss your needs.',
      },
      {
        question: 'What if I order the wrong size?',
        answer:
          'If your ring doesn\'t fit, contact us within 30 days and we\'ll arrange a resize or exchange. Standard rings can typically be resized up or down by 1-2 sizes at no charge.',
      },
    ],
  },
  {
    name: 'Custom Orders',
    faqs: [
      {
        question: 'Can you create custom jewelry designs?',
        answer:
          'Yes! We love bringing unique visions to life. Contact us to discuss your ideas, and our design team will work with you to create a one-of-a-kind piece.',
      },
      {
        question: 'How long does a custom order take?',
        answer:
          'Custom orders typically take 4-8 weeks depending on complexity. We\'ll provide a specific timeline after discussing your design requirements.',
      },
      {
        question: 'Can I add engravings to my jewelry?',
        answer:
          'Yes, many of our pieces can be personalized with engravings. Add your message in the customization notes at checkout, or contact us for pieces with specific engraving requirements.',
      },
    ],
  },
  {
    name: 'Care & Warranty',
    faqs: [
      {
        question: 'How should I care for my jewelry?',
        answer:
          'Store your jewelry in a soft pouch or lined box when not wearing. Clean gently with a soft cloth. Avoid exposure to chemicals, perfumes, and chlorine. Remove jewelry before swimming or showering.',
      },
      {
        question: 'What warranty do you offer?',
        answer:
          'All KaraLITH jewelry comes with a 2-year warranty covering manufacturing defects. This includes free repairs for loose stones, broken clasps, or structural issues that occur under normal wear.',
      },
      {
        question: 'Do you offer jewelry cleaning services?',
        answer:
          'Yes, we offer complimentary cleaning and inspection for all KaraLITH pieces. Simply bring or send your jewelry to us, and we\'ll restore its sparkle.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-h1 mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Find answers to common questions about our jewelry, ordering, and
          policies.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No questions found matching your search.
            </p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.name} className="mb-8">
              <h2 className="font-heading text-xl mb-4">{category.name}</h2>

              <div className="space-y-3">
                {category.faqs.map((faq, index) => {
                  const id = `${category.name}-${index}`;
                  const isOpen = openItems.includes(id);

                  return (
                    <div
                      key={id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium pr-8">{faq.question}</span>
                        <ChevronDown
                          className={cn(
                            'h-5 w-5 text-muted-foreground shrink-0 transition-transform',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center p-8 bg-secondary/20 rounded-lg">
        <h2 className="font-heading text-xl mb-3">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Can't find what you're looking for? Our team is happy to help.
        </p>
        <Link href="/contact">
          <Button>Contact Us</Button>
        </Link>
      </div>
    </div>
  );
}
