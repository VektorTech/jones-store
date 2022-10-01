import Link from "next/link";

import { VscChromeClose } from "react-icons/vsc";
import { BsSliders } from "react-icons/bs";
import { ImArrowDown } from "react-icons/im";
import { IoIosArrowUp, IoIosArrowBack } from "react-icons/io";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export default function Category() {
	return (
		<div>
			<div className="breadcrumb">
				<div className="breadcrumb__container">
					<ul className="breadcrumb__list">
						<li className="breadcrumb__list-item">
							<Link href="">
								<a>Home</a>
							</Link>
						</li>
						<li className="breadcrumb__list-item">
							<Link href="">
								<a>Women</a>
							</Link>
						</li>
						<li className="breadcrumb__list-item">
							<Link href="">
								<a>Mids</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>

			<div className="constraints">
				<div className="constraints__container">
					<h1 className="constraints__title"></h1>
					<p className="constraints__results">Showing <span>1</span> &mdash; <span>48</span> of <span>375</span> results</p>
					<div className="constraints__filters">
						<button className="constraints__filter">
							<span>Brand</span> <span>Jordan</span>
							<span role="button" className="constraints__filter-close">
								<VscChromeClose />
							</span>
						</button>
						<button className="constraints__filter">
							<span>Gender</span> <span>Women</span>
							<span role="button" className="constraints__filter-close">
								<VscChromeClose />
							</span>
						</button>
						<button className="constraints__clear-all">
							Clear All
							<span role="button" className="constraints__filter-close">
								<VscChromeClose />
							</span>
						</button>
					</div>
				</div>
			</div>

			<div className="filter-sort">
				<div className="filter-sort__container">
					<button className="filter-sort__toggle">
						<BsSliders className="filter-sort__toggle-icon" />
						<span>filter</span>
					</button>

					<div className="filter-sort__sort-by">
						<span>Sort By</span>

						<select className="filter-sort__sort-select" name="" id="">
							<option value="">Relevance</option>
							<option value="">Price</option>
							<option value="">Ratings</option>
						</select>

						<button className="filter-sort__order">
							<ImArrowDown className="filter-sort__order-icon" />
						</button>
					</div>
				</div>
			</div>

			<div className="results">
				<div className="results__filter">
					<div className="filter">
						<div className="filter__head">
							<span>Filter</span>
							<button className="filter__hide">
								<IoIosArrowBack />
							</button>
						</div>

						<div className="filter__param">
							<label className="filter__param-section">
								<span className="filter__param-type">
									<IoIosArrowUp />
								</span>
								<input type="checkbox" className="filter__param-hide" />
								<div className="filter__param-body"></div>
							</label>
						</div>

						<div className="filter__confirm">
							<button className="filter__clear-all">clear all</button>
							<button className="filter__done">done</button>
						</div>
					</div>
				</div>

				<div className="results__grid"></div>
				<div className="results__pagination">
					<button className="results__pagination-first"><AiOutlineDoubleLeft /></button>
					<button className="results__pagination-prev">Prev</button>
					<button className="results__pagination-page">1</button>
					<button className="results__pagination-page">2</button>
					<button className="results__pagination-next">Next</button>
					<button className="results__pagination-last"><AiOutlineDoubleRight /></button>
				</div>
			</div>
		</div>
	);
}