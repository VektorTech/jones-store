import Header from "./header";
import Footer from "./Footer";
import { ReactElement } from "react";

export default function Layout({
  children
}: {
  children: ReactElement;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
