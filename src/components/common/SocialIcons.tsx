import Link from "next/link";
import {
	RiFacebookBoxFill,
	RiInstagramFill,
	RiYoutubeFill,
	RiTwitterFill,
	RiPinterestFill
} from "react-icons/ri";

export default function SocialIcons({ vertical, size = "sm" } : { vertical?: boolean, size?: "sm" | "md" | "lg" }) {
	return (
		<div className={`social-links${(vertical ? " social-links--vertical " : " ")}social-links--${size}`}>
          <Link href="/">
          <a className="social-links__link">
            <RiFacebookBoxFill />
          </a></Link>
          <Link href="/">
          <a className="social-links__link">
            <RiInstagramFill />
          </a></Link>
          <Link href="/"><a className="social-links__link">
            <RiYoutubeFill />
          </a></Link>
          <Link href="/"><a className="social-links__link">
            <RiTwitterFill />
          </a></Link>
          <Link href="/"><a className="social-links__link">
            <RiPinterestFill />
          </a></Link>
        </div>
	);
};