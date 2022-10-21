import Header from "./header";
import Footer from "./Footer";
import { ReactElement } from "react";
import HeroBanner from "./HeroBanner";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      <HeroBanner />
      <main>{children}</main>
      <Footer />
    </>
  );
}
