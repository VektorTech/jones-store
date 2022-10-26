import Header from "./header";
import Footer from "./Footer";
import { ReactElement } from "react";
import HeroBanner from "./HeroBanner";

import { useDialog } from "@Lib/contexts/UIContext";

export default function Layout({ children }: { children: ReactElement }) {
  useDialog(
    (isVisible, current) => {
      if (
        (current == "PRODUCTS_FILTER" && innerWidth <= 992) ||
        current != "PRODUCTS_FILTER"
      ) {
        document.body.style.overflow = isVisible ? "hidden" : "auto";
      }
    },
    ["SIDEBAR_DIALOG", "SEARCH_BOX", "MODAL_POPUP", "PRODUCTS_FILTER"]
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
