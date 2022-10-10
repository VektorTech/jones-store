import { useDialog } from "@Lib/contexts/UIContext";
import Announcement from "./Announcement";
import HeaderSection from "./HeaderSection";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";

function Header() {
  useDialog((isVisible) => {
    document.body.style.overflow = isVisible ? "hidden" : "auto";
  }, ["SIDEBAR_DIALOG", "SEARCH_BOX"]);

  return (
    <>
      <SearchBox />
      <Sidebar />
      <Announcement />
      <HeaderSection />
    </>
  );
}

export default function _Header() {
  return (
    <Header />
  );
}
