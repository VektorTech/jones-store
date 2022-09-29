import Announcement from "./Announcement";
import HeaderSection from "./HeaderSection";
import Sidebar, { LayoutProvider, useLayout } from "./Sidebar";
import SearchBox from "./SearchBox";

function Header() {
	useLayout((isVisible) => {
		document.body.style.overflow = isVisible ? "hidden" : "auto";
	});

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
		<LayoutProvider>
			<Header />
		</LayoutProvider>
	);
}