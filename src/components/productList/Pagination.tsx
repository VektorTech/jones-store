import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Pagination() {
  return (
    <div className="results__pagination">
      <button className="results__pagination-button results__pagination-button--disabled">
        <AiOutlineDoubleLeft />
      </button>
      <button className="results__pagination-button results__pagination-button--disabled">
        <AiOutlineLeft />
      </button>
      <button className="results__pagination-button results__pagination-button--active">
        1
      </button>
      <button className="results__pagination-button">
        2
      </button>
      <button className="results__pagination-button">
        3
      </button>
      <span className="results__pagination-button">&#8230;</span>
      <button className="results__pagination-button">9</button>
      <button className="results__pagination-button"><AiOutlineRight /></button>
      <button className="results__pagination-button">
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
}
