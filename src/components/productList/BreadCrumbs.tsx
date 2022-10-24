import Link from "next/link";

export default function BreadCrumbs() {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__container">
        <ul className="breadcrumb__list">
          <li className="breadcrumb__list-item">
            <Link href="">
              <a className="breadcrumb__link breadcrumb__link--root">Home</a>
            </Link>
          </li>
          <li className="breadcrumb__list-item">〉</li>
          <li className="breadcrumb__list-item">
            <Link href="">
              <a className="breadcrumb__link">Women</a>
            </Link>
          </li>
          <li className="breadcrumb__list-item">〉</li>
          <li className="breadcrumb__list-item">
            <Link href="">
              <a className="breadcrumb__link">Mids</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
