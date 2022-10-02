import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

export default function Pagination() {
	return (
		<div className="results__pagination">
		<button className="results__pagination-first"><AiOutlineDoubleLeft /></button>
		<button className="results__pagination-prev">Prev</button>
		<button className="results__pagination-page">1</button>
		<button className="results__pagination-page">2</button>
		<button className="results__pagination-next">Next</button>
		<button className="results__pagination-last"><AiOutlineDoubleRight /></button>
	</div>
	);
}