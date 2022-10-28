import Link from "next/link";
import { Fragment } from "react";

export default function BreadCrumbs({
  items,
}: {
  items: ({ url: string; text: string; })[];
}) {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb__container">
        <ul className="breadcrumb__list">
          <li className="breadcrumb__list-item">
            <Link href="/">
              <a className="breadcrumb__link breadcrumb__link--root">HOME</a>
            </Link>
          </li>

          {items.map(({text, url}) => (
            <Fragment key={text}>
              <li className="breadcrumb__list-item breadcrumb__list-separator">〉</li>
              <li className="breadcrumb__list-item">
                <Link href={url}>
                  <a className="breadcrumb__link">
                    {text}
                  </a>
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
