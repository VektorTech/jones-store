import Header from "../header";
import Footer from "../Footer";
import { ReactElement } from "react";
import HeroBanner from "../HeroBanner";

import { DialogType, useDialog } from "@Lib/contexts/UIContext";
import { ScrollUpButton } from "../ScrollUpButton";
import FeaturesSection from "../home/FeaturesSection";

export default function Layout({ children }: { children: ReactElement }) {
  useDialog(
    (isVisible) => {
      document.body.style.overflow = isVisible ? "hidden" : "auto";
    },
    [
      DialogType.SIDEBAR_DIALOG,
      DialogType.SEARCH_BOX,
      DialogType.MODAL_ANNOUNCEMENT,
      DialogType.MODAL_LANG_CURRENCY,
      DialogType.MODAL_PRODUCT_VIEW,
    ]
  );

  return (
    <>
      <Header />
      <HeroBanner />
      <main>{children}</main>
      <FeaturesSection />
      <Footer />
      <ScrollUpButton />
    </>
  );
}
