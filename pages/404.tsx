import Image from "next/image";
import Link from "next/link";
import BannerImage from "@Images/banner-bg-eindhoven.jpg";

export default function Custom404() {
  return (
    <div className="not-found">
      <h1 className="not-found__title">
        <span>404</span>
        <Image className="not-found__image" objectFit="cover" src={BannerImage} alt="" layout="fill" />
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
