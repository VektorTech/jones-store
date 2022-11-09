import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";

export default function BreadCrumbs() {
  const router = useRouter();

  const pathsList = router.asPath
    .split("?")[0]
    .split("/")
    .filter(Boolean)
    .reduce((arr: { url: string; text: string }[], str: string) => {
      return arr.concat({
        url: (arr[arr.length - 1]?.url || "") + "/" + str,
        text: str.toUpperCase(),
      });
    }, [])
    .splice(1);

  return (
    <div className="breadcrumb">
      <div className="breadcrumb__container">
        <ul className="breadcrumb__list">
          <li className="breadcrumb__list-item">
            <Link href="/">
              <a className="breadcrumb__link breadcrumb__link--root">HOME</a>
            </Link>
          </li>

          {pathsList.map(({ text, url }, index) => (
            <Fragment key={text}>
              <li className="breadcrumb__list-item breadcrumb__list-separator">
                〉
              </li>
              <li
                className={
                  "breadcrumb__list-item" +
                  (index == pathsList.length - 1
                    ? " breadcrumb__list-item--current"
                    : "")
                }
              >
                <Link href={url}>
                  <a className="breadcrumb__link">{text}</a>
                </Link>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
