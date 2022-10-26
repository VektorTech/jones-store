import Header from "./header";
import Footer from "./Footer";
import { ReactElement } from "react";
import HeroBanner from "./HeroBanner";

import { useDialog } from "@Lib/contexts/UIContext";


export default function Layout({ children }: { children: ReactElement }) {
  useDialog(
    (isVisible) => {
      document.body.style.overflow = isVisible ? "hidden" : "auto";
    },
    ["SIDEBAR_DIALOG", "SEARCH_BOX", "MODAL_POPUP"]
  );

  return (
    <>
      <Header />
      <HeroBanner />
      <main>{children}</main>
      <Footer />
    </>
  );
}
