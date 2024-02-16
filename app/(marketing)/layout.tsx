import { Footer } from './_components/footer';
import { Navbar } from './_components/navbar';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <main className="flex flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
