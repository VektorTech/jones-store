import { IoIosArrowUp, IoIosArrowBack } from "react-icons/io";

export default function Filter() {
	return (
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
	);
}