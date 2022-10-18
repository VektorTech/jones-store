import { SocialHandles } from "@Lib/config";
import Link from "next/link";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiTwitterFill,
  RiPinterestFill,
} from "react-icons/ri";
import { SiTiktok } from "react-icons/si";

export default function SocialButtons({
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
      {SocialHandles.facebook ? (
        <Link href={`https://www.facebook.com/${SocialHandles.facebook}/`}>
          <a className="social-links__link">
            <RiFacebookBoxFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.instagram ? (
        <Link href={`https://www.instagram.com/${SocialHandles.instagram}/`}>
          <a className="social-links__link">
            <RiInstagramFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.youtube ? (
        <Link href={`https://www.youtube.com/c/${SocialHandles.youtube}`}>
          <a className="social-links__link">
            <RiYoutubeFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.twitter ? (
        <Link href={`https://twitter.com/${SocialHandles.twitter}`}>
          <a className="social-links__link">
            <RiTwitterFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.pinterest ? (
        <Link href={`https://www.pinterest.com/${SocialHandles.pinterest}/`}>
          <a className="social-links__link">
            <RiPinterestFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.tiktok ? (
        <Link href={`https://www.tiktok.com/@${SocialHandles.tiktok}`}>
          <a className="social-links__link">
            <SiTiktok fontSize={23} />
          </a>
        </Link>
      ) : null}
    </div>
  );
}
