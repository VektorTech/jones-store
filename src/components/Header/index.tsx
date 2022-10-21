import { useAnnouncementState, useDialog } from "@Lib/contexts/UIContext";
import { useAuthState } from "@Lib/contexts/AuthContext";
import Announcement from "./Announcement";
import HeaderSection from "./HeaderSection";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";

function Header() {
  useDialog(
    (isVisible) => {
      document.body.style.overflow = isVisible ? "hidden" : "auto";
    },
    ["SIDEBAR_DIALOG", "SEARCH_BOX"]
  );

  const [announcementVisible] = useAnnouncementState();
  const { user, isLoading, userSessionId, isError, isAuth } = useAuthState();

  return (
    <>
      <SearchBox />
      <Sidebar userId={user?.id} />
      <Announcement />
      <HeaderSection announcementVisible={announcementVisible} />
    </>
  );
}

export default function _Header() {
  return <Header />;
}
