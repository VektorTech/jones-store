import Link from "next/link";
import FutureImage from "next/future/image";
import logoImg from "@Images/jones-logo.png";

export default function Logo() {
  return (
    <Link href="/">
      <a className="logo">
        <FutureImage width={80} height={46} alt="" src={logoImg} />
		<span className="logo__subtext">Jordan Ones</span>
      </a>
    </Link>
  );
}
