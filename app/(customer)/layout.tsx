import { Header, Footer, WhatsAppButton } from '@/components/layout';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[calc(2.5rem+4rem)] md:pt-[calc(2.5rem+5rem)]">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
