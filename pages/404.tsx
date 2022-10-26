import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">
        <span>404</span>
      </h1>
      <h2 className="not-found__sub-title">Page Not Found!</h2>
      <p className="not-found__text">
        The page you were looking for does not exist.
      </p>
      <Link href={"/"}>
        <a className="not-found__link">Homepage</a>
      </Link>
    </div>
  );
}
