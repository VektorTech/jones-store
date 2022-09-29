import { BsXLg } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";
import Product from "@Components/common/Product";

import { useState } from "react";

export default function SearchBox() {
	const [active, setActive] = useState(true);

	if (!active) return null;

	return (
		<div className="search">
			<button className="search__close" onClick={() => setActive(false)}><VscChromeClose className="search__close-icon" /></button>
			<div className="search__container">
				<h3 className="search__title">What are you looking for?</h3>
				<label className="search__input">
					<input type="search" className="search__input-box" placeholder="Search Jones Store for..." />
					<FiSearch className="search__input-icon" />
				</label>
				<div className="search__trends">
					<span className="search__trends-title">Popular Searches:</span>
					<button className="search__trends-tag">og high</button>
					<button className="search__trends-tag">shadow</button>
					<button className="search__trends-tag">black toe</button>
				</div>
				<h3 className="search__results-info">5 Jordans Found</h3>
				<div className="search__results">
					<Product small />
					<Product small />
					<Product small />
					<Product small />
					<Product small />
				</div>
			</div>
		</div>
	);
}