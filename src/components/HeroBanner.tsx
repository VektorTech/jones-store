import Image from "next/image";
import Link from "next/link";
import { RiRadioButtonLine, RiCheckboxBlankCircleFill } from "react-icons/ri";

import SocialIcons from "./common/SocialButtons";

import BannerImage from "@Images/jordan-1-banner.png";
import { useAnnouncementState } from "@Lib/contexts/UIContext";

export default function HeroBanner({ short }: { short?: boolean;}) {
  const announcementVisible = useAnnouncementState();

  return (
    <section className={"banner" + (short ? " banner--short" : "") + (announcementVisible ? " banner--with-announcement" : "")}>
      <div className="banner__container">
        <div className="banner__background"></div>
        { short ? null :
          <>
            <div className="banner__indicators">
              <button className="banner__indicator banner__indicator--active">
                <RiRadioButtonLine />
              </button>
              <button className="banner__indicator">
                <RiCheckboxBlankCircleFill />
              </button>
              <button className="banner__indicator">
                <RiCheckboxBlankCircleFill />
              </button>
            </div>

            <div className="banner__social-links">
              <SocialIcons vertical />
            </div>

            <div className="banner__main">
              <div className="banner__content">
                <div className="banner__headings">
                  <p className="banner__secondary-text">
                    <span>verified</span> authentic sneakers
                  </p>
                  <h2 className="banner__title-type">heirloom</h2>
                  <h3 className="banner__title">retro high og</h3>
                </div>
                <div className="banner__image">
                  <Image
                    layout="responsive"
                    width={220}
                    height={144}
                    src={BannerImage}
                    alt=""
                  />
                </div>
                <div className="banner__action-button">
                  <Link href="/category/men/retro-high-og">
                    <a className="banner__action-button-element">
                      <span>buy yours</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </section>
  );
}
