import Header from "./header";
import Footer from "./Footer";
import { ReactElement } from "react";
import HeroBanner from "./HeroBanner";

import { DialogType, useDialog } from "@Lib/contexts/UIContext";

export default function Layout({ children }: { children: ReactElement }) {
  useDialog(
    (isVisible) => {
      document.body.style.overflow = isVisible ? "hidden" : "auto";
    },
    [DialogType.SIDEBAR_DIALOG, DialogType.SEARCH_BOX, DialogType.MODAL_POPUP]
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
