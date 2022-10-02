import { useEffect, useState } from "react";

export default function useScrollTop() {
	const [ scrollTop, setScrollTop ] = useState(0);

	useEffect(() => {
		addEventListener("scroll", () => {
			const _scrollTop = document.documentElement.scrollTop;
			setScrollTop(_scrollTop);
		});
	}, []);

	return scrollTop;
}