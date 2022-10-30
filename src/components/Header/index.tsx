import { useAnnouncementState } from "@Lib/contexts/UIContext";
import { useAuthState } from "@Lib/contexts/AuthContext";
import Announcement from "./Announcement";
import HeaderSection from "./HeaderSection";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";

function Header() {
  const [announcementVisible] = useAnnouncementState();
  const { user, isLoading, userSessionId, isError } = useAuthState();

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
