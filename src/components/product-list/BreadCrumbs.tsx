import Link from "next/link";

export default function BreadCrumbs() {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__container">
        <ul className="breadcrumb__list">
          <li className="breadcrumb__list-item">
            <Link href="">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb__list-sep"> | </li>
          <li className="breadcrumb__list-item">
            <Link href="">
              <a>Women</a>
            </Link>
          </li>
          <li className="breadcrumb__list-sep"> | </li>
          <li className="breadcrumb__list-item">
            <Link href="">
              <a>Mids</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
