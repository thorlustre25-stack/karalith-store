import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ring Size Guide',
  description:
    'Learn how to measure your ring size at home. Complete guide with size charts and measuring tips.',
};

const sizeChart = [
  { us: '4', eu: '46.8', uk: 'H', diameter: '14.9mm', circumference: '46.8mm' },
  { us: '4.5', eu: '47.8', uk: 'I', diameter: '15.3mm', circumference: '47.8mm' },
  { us: '5', eu: '49.0', uk: 'J', diameter: '15.7mm', circumference: '49.0mm' },
  { us: '5.5', eu: '50.0', uk: 'K', diameter: '16.1mm', circumference: '50.0mm' },
  { us: '6', eu: '51.2', uk: 'L', diameter: '16.5mm', circumference: '51.2mm' },
  { us: '6.5', eu: '52.4', uk: 'M', diameter: '16.9mm', circumference: '52.4mm' },
  { us: '7', eu: '53.8', uk: 'N', diameter: '17.3mm', circumference: '53.8mm' },
  { us: '7.5', eu: '54.8', uk: 'O', diameter: '17.7mm', circumference: '54.8mm' },
  { us: '8', eu: '56.0', uk: 'P', diameter: '18.1mm', circumference: '56.0mm' },
  { us: '8.5', eu: '57.0', uk: 'Q', diameter: '18.5mm', circumference: '57.0mm' },
  { us: '9', eu: '58.4', uk: 'R', diameter: '18.9mm', circumference: '58.4mm' },
  { us: '9.5', eu: '59.4', uk: 'S', diameter: '19.3mm', circumference: '59.4mm' },
  { us: '10', eu: '60.6', uk: 'T', diameter: '19.8mm', circumference: '60.6mm' },
  { us: '10.5', eu: '61.8', uk: 'U', diameter: '20.2mm', circumference: '61.8mm' },
  { us: '11', eu: '62.8', uk: 'V', diameter: '20.6mm', circumference: '62.8mm' },
  { us: '11.5', eu: '64.0', uk: 'W', diameter: '21.0mm', circumference: '64.0mm' },
  { us: '12', eu: '65.2', uk: 'X', diameter: '21.4mm', circumference: '65.2mm' },
];

export default function RingSizeGuidePage() {
  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-h1 mb-4">Ring Size Guide</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find your perfect ring size with our easy measurement guide.
        </p>
      </div>

      {/* Methods */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* String Method */}
        <div className="bg-white border rounded-lg p-8">
          <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-6">
            <span className="font-heading text-2xl text-primary">1</span>
          </div>
          <h2 className="font-heading text-xl mb-4">String/Paper Method</h2>
          <ol className="space-y-4 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 1:</span>
              <span>
                Cut a thin strip of paper or string about 10cm (4 inches) long.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 2:</span>
              <span>
                Wrap it around the base of your finger, just below the knuckle.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 3:</span>
              <span>
                Mark where the paper overlaps to form a complete circle.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 4:</span>
              <span>
                Measure the length with a ruler in millimeters. This is your
                circumference.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 5:</span>
              <span>
                Use the size chart below to find your ring size.
              </span>
            </li>
          </ol>
        </div>

        {/* Existing Ring Method */}
        <div className="bg-white border rounded-lg p-8">
          <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-6">
            <span className="font-heading text-2xl text-primary">2</span>
          </div>
          <h2 className="font-heading text-xl mb-4">Existing Ring Method</h2>
          <ol className="space-y-4 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 1:</span>
              <span>
                Select a ring that fits comfortably on the intended finger.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 2:</span>
              <span>
                Place the ring on a ruler and measure the inside diameter (the
                widest point across the inside).
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 3:</span>
              <span>
                Note the measurement in millimeters.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-medium text-primary shrink-0">Step 4:</span>
              <span>
                Use the size chart below to find your ring size based on
                diameter.
              </span>
            </li>
          </ol>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-secondary/20 rounded-lg p-8 mb-16">
        <h2 className="font-heading text-xl mb-6 text-center">
          Tips for Accurate Measurement
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🌡️</div>
            <h3 className="font-medium mb-2">Temperature Matters</h3>
            <p className="text-sm text-muted-foreground">
              Measure when your hands are at normal temperature - cold fingers
              are smaller.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🕐</div>
            <h3 className="font-medium mb-2">Time of Day</h3>
            <p className="text-sm text-muted-foreground">
              Measure at the end of the day when fingers are slightly larger.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔄</div>
            <h3 className="font-medium mb-2">Measure Multiple Times</h3>
            <p className="text-sm text-muted-foreground">
              Take several measurements and use the average for best accuracy.
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📏</div>
            <h3 className="font-medium mb-2">Consider the Width</h3>
            <p className="text-sm text-muted-foreground">
              Wider bands fit tighter - go up 1/2 size for bands over 6mm.
            </p>
          </div>
        </div>
      </div>

      {/* Size Chart */}
      <div className="mb-16">
        <h2 className="font-heading text-xl mb-6 text-center">
          International Ring Size Chart
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border p-3 text-left font-medium">US Size</th>
                <th className="border p-3 text-left font-medium">EU Size</th>
                <th className="border p-3 text-left font-medium">UK Size</th>
                <th className="border p-3 text-left font-medium">Diameter</th>
                <th className="border p-3 text-left font-medium">
                  Circumference
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((size, index) => (
                <tr
                  key={size.us}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}
                >
                  <td className="border p-3">{size.us}</td>
                  <td className="border p-3">{size.eu}</td>
                  <td className="border p-3">{size.uk}</td>
                  <td className="border p-3">{size.diameter}</td>
                  <td className="border p-3">{size.circumference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-8 bg-primary text-white rounded-lg">
        <h2 className="font-heading text-xl mb-3">Need Help?</h2>
        <p className="text-white/80 mb-6">
          Still unsure about your size? Contact us and we'll help you find the
          perfect fit.
        </p>
        <Link href="/contact">
          <Button variant="gold">Contact Us</Button>
        </Link>
      </div>
    </div>
  );
}
