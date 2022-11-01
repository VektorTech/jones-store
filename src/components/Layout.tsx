import Header from "./header";
import Footer from "./Footer";
import { ReactElement } from "react";
import HeroBanner from "./HeroBanner";

import { DialogType, useDialog } from "@Lib/contexts/UIContext";

export default function Layout({ children }: { children: ReactElement }) {
  useDialog(
    (isVisible, current) => {
      if (
        (current == DialogType.PRODUCTS_FILTER && innerWidth <= 992) ||
        current != DialogType.PRODUCTS_FILTER
      ) {
        document.body.style.overflow = isVisible ? "hidden" : "auto";
      }
    },
    [
      DialogType.SIDEBAR_DIALOG,
      DialogType.SEARCH_BOX,
      DialogType.MODAL_POPUP,
      DialogType.PRODUCTS_FILTER,
    ]
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
