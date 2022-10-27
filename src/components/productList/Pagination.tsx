import { range } from "@Lib/utils";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";

function getOffsetPath(router: NextRouter, offset = 0) {
  const { colorway, sizes, height, price } = router.query;
  return {
    pathname: router.asPath.split("?")[0],
    query: { colorway, sizes, height, price, offset },
  };
}

export default function Pagination({
  resultsCount,
  limit,
  offset,
}: {
  resultsCount: number;
  limit: number;
  offset: number;
}) {
  const pageCount = Math.floor(resultsCount / limit) + 1;
  const currentPage = Math.floor(pageCount * (offset / resultsCount)) + 1;
  const router = useRouter();

  return (
    <div className="results__pagination">
      <Link href={currentPage > 1 ? getOffsetPath(router, 0) : "#"}>
        <a
          onClick={(e) => {
            if (currentPage <= 1) {
              e.preventDefault();
            }
          }}
          className={
            "results__pagination-button" +
            (currentPage <= 1 ? " results__pagination-button--disabled" : "")
          }
        >
          <AiOutlineDoubleLeft />
        </a>
      </Link>
      <Link
        href={currentPage > 1 ? getOffsetPath(router, offset - limit) : "#"}
      >
        <a
          onClick={(e) => {
            if (currentPage <= 1) {
              e.preventDefault();
            }
          }}
          className={
            "results__pagination-button" +
            (currentPage <= 1 ? " results__pagination-button--disabled" : "")
          }
        >
          <AiOutlineLeft />
        </a>
      </Link>

      {range(currentPage, Math.min(currentPage + 3, pageCount)).map(
        (pageNum) => (
          <Link
            key={pageNum}
            href={getOffsetPath(router, (pageNum - 1) * limit)}
          >
            <a
              className={
                "results__pagination-button" +
                (pageNum == currentPage
                  ? " results__pagination-button--active"
                  : "")
              }
            >
              {pageNum}
            </a>
          </Link>
        )
      )}

      {pageCount > 1 && (
        <>
          <span className="results__pagination-button">&#8230;</span>
          <Link href="">
            <a className="results__pagination-button">{pageCount}</a>
          </Link>
        </>
      )}
      <Link
        href={
          currentPage < pageCount ? getOffsetPath(router, offset + limit) : "#"
        }
      >
        <a
          onClick={(e) => {
            if (currentPage == pageCount) {
              e.preventDefault();
            }
          }}
          className={
            "results__pagination-button" +
            (currentPage == pageCount
              ? " results__pagination-button--disabled"
              : "")
          }
        >
          <AiOutlineRight />
        </a>
      </Link>

      <Link
        href={
          currentPage < pageCount
            ? getOffsetPath(router, pageCount * limit - limit)
            : "#"
        }
      >
        <a
          onClick={(e) => {
            if (currentPage == pageCount) {
              e.preventDefault();
            }
          }}
          className={
            "results__pagination-button" +
            (currentPage == pageCount
              ? " results__pagination-button--disabled"
              : "")
          }
        >
          <AiOutlineDoubleRight />
        </a>
      </Link>
    </div>
  );
}
