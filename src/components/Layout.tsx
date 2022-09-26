import PromoBanner from "./Header/PromoBanner";
import HeaderSection from "./Header/HeaderSection";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBanner />
      <HeaderSection />
      <main>{children}</main>
      <Footer />
    </>
  );
}
