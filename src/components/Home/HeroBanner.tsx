import Image from "next/image";
import Link from "next/link";
import { RiRadioButtonLine, RiCheckboxBlankCircleFill } from "react-icons/ri";

import SocialIcons from "../common/SocialIcons";

import jordanOneBanner from "@Images/jordan-1-banner.png";

export default function HeroBanner() {
  return (
    <section className="banner">
      <div className="banner__container">
        <div className="banner__background"></div>
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
                src={jordanOneBanner}
                alt=""
              />
            </div>
            <div className="banner__action-button">
              <Link href="/">
                <a className="banner__action-button-element">
                  <span>buy yours</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
