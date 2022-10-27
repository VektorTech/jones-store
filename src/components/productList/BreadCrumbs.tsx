import Link from "next/link";

export default function BreadCrumbs({
  items,
}: {
  items: (string | undefined)[];
}) {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__container">
        <ul className="breadcrumb__list">
          <li className="breadcrumb__list-item">
            <Link href="">
              <a className="breadcrumb__link breadcrumb__link--root">HOME</a>
            </Link>
          </li>
          <li className="breadcrumb__list-item">〉</li>
          <li className="breadcrumb__list-item">
            <Link href={"/category/" + items?.[0]}>
              <a className="breadcrumb__link">{items?.[0]?.toUpperCase()}</a>
            </Link>
          </li>
          {items?.[1] && (
            <>
              <li className="breadcrumb__list-item">〉</li>
              <li className="breadcrumb__list-item">
                <a className="breadcrumb__link">{items[1]}</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
