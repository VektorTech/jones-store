import Announcement from "./Announcement";
import HeaderSection from "./HeaderSection";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <>
      <SearchBox />
      <Sidebar />
      <Announcement />
      <HeaderSection />
    </>
  );
}
