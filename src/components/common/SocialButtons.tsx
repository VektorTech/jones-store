import Link from "next/link";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiTwitterFill,
  RiPinterestFill,
  RiGithubFill,
} from "react-icons/ri";
import { SiTiktok } from "react-icons/si";

import { SocialHandles } from "@Lib/config";

export default function SocialButtons({ vertical, size = "sm" }: PropTypes) {
  return (
    <div
      className={`social-links${
        vertical ? " social-links--vertical " : " "
      }social-links--${size}`}
    >
      {SocialHandles.facebook ? (
        <Link href={`https://www.facebook.com/${SocialHandles.facebook}/`}>
          <a aria-label="Follow us on Facebook" className="social-links__link">
            <RiFacebookBoxFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.instagram ? (
        <Link href={`https://www.instagram.com/${SocialHandles.instagram}/`}>
          <a aria-label="Follow us on Instagram" className="social-links__link">
            <RiInstagramFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.tiktok ? (
        <Link href={`https://www.tiktok.com/@${SocialHandles.tiktok}`}>
          <a
            aria-label="Follow us on TikTok"
            className="social-links__link social-links__link--tiktok"
          >
            <SiTiktok />
          </a>
        </Link>
      ) : null}

      {SocialHandles.youtube ? (
        <Link href={`https://www.youtube.com/c/${SocialHandles.youtube}`}>
          <a aria-label="Follow us on YouTube" className="social-links__link">
            <RiYoutubeFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.twitter ? (
        <Link href={`https://twitter.com/${SocialHandles.twitter}`}>
          <a aria-label="Follow us on Twitter" className="social-links__link">
            <RiTwitterFill />
          </a>
        </Link>
      ) : null}

      {SocialHandles.pinterest ? (
        <Link href={`https://www.pinterest.com/${SocialHandles.pinterest}/`}>
          <a aria-label="Follow us on Pinterest" className="social-links__link">
            <RiPinterestFill />
          </a>
        </Link>
      ) : null}

      <Link href="https://github.com/VektorTech/jones-store">
        <a aria-label="Follow us on Github" className="social-links__link">
          <RiGithubFill />
        </a>
      </Link>
    </div>
  );
}

interface PropTypes {
  vertical?: boolean;
  size?: "sm" | "md" | "lg";
}
