import Announcement from "./header/Announcement";
import HeaderSection from "./header/HeaderSection";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Announcement />
      <HeaderSection />
      <main>{children}</main>
      <Footer />
    </>
  );
}
