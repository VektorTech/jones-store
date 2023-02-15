import { ReactNode } from "react";

import Header from "../header";
import Cart from "../Cart";
import Footer from "../Footer";
import HeroBanner from "../HeroBanner";
import { ScrollUpButton } from "../ScrollUpButton";
import FeaturesSection from "../FeaturesSection";

import { DialogType, useDialog } from "@Contexts/UIContext";

export default function Layout({ children }: { children: ReactNode }) {
  useDialog(
    (isVisible) => {
      document.body.style.overflow = isVisible ? "hidden" : "auto";
    },
    [
      DialogType.SIDEBAR_DIALOG,
      DialogType.SEARCH_BOX,
      DialogType.CART,
      DialogType.MODAL_ANNOUNCEMENT,
      DialogType.MODAL_LANG_CURRENCY,
      DialogType.MODAL_PRODUCT_VIEW,
    ]
  );

  return (
    <>
      <Header />
      <Cart />
      <HeroBanner />
      <main>{children}</main>
      <FeaturesSection />
      <Footer />
      <ScrollUpButton />
    </>
  );
}
