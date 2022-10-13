import { SocialHandles } from "@Lib/config";
import Link from "next/link";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiTwitterFill,
  RiPinterestFill,
} from "react-icons/ri";

export default function SocialIcons({
  vertical,
  size = "sm",
}: {
  vertical?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={`social-links${
        vertical ? " social-links--vertical " : " "
      }social-links--${size}`}
    >
      <Link href={`https://www.facebook.com/${SocialHandles.facebook}/`}>
        <a className="social-links__link">
          <RiFacebookBoxFill />
        </a>
      </Link>
      <Link href={`https://www.instagram.com/${SocialHandles.instagram}/`}>
        <a className="social-links__link">
          <RiInstagramFill />
        </a>
      </Link>
      <Link href={`https://www.youtube.com/c/${SocialHandles.youtube}`}>
        <a className="social-links__link">
          <RiYoutubeFill />
        </a>
      </Link>
      <Link href={`https://twitter.com/${SocialHandles.twitter}`}>
        <a className="social-links__link">
          <RiTwitterFill />
        </a>
      </Link>
      <Link href={`https://www.pinterest.com/${SocialHandles.pinterest}/`}>
        <a className="social-links__link">
          <RiPinterestFill />
        </a>
      </Link>
    </div>
  );
}
