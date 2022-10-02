import Announcement from "./Announcement";
import HeaderSection from "./HeaderSection";
import Sidebar, { LayoutProvider, useLayout } from "./Sidebar";
import SearchBox from "./SearchBox";

function Header({ announcementState }: { announcementState?: boolean }) {
	useLayout((isVisible) => {
		document.body.style.overflow = isVisible ? "hidden" : "auto";
	});

	return (
		<>
			<SearchBox />
			<Sidebar />
			<Announcement announcementState={announcementState} />
			<HeaderSection />
		</>
	);
}

export default function _Header({ announcementState }: { announcementState?: boolean }) {
	return (
		<LayoutProvider>
			<Header announcementState={announcementState} />
		</LayoutProvider>
	);
}