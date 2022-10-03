import Header from "./header";
import Footer from "./Footer";

export default function Layout({
  children,
  announcementState,
}: {
  children: React.ReactNode;
  announcementState?: boolean;
}) {
  return (
    <>
      <Header announcementState={announcementState} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
