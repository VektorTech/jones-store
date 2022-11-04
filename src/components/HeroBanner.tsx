import Image from "next/image";
import Link from "next/link";
import { RiRadioButtonLine, RiCheckboxBlankCircleFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";

import SocialIcons from "./common/SocialButtons";

import BannerImage1 from "@Images/jordan-1-banner.png";
import BannerImage2 from "@Images/jordan-1-banner-2.png";
import BannerImage3 from "@Images/jordan-1-banner-3.png";
import { useAnnouncementState } from "@Lib/contexts/UIContext";
import { useRouter } from "next/router";

export default function HeroBanner() {
  const announcementVisible = useAnnouncementState();
  const router = useRouter();
  const short = router.pathname != "/";

  const [activeView, setActiveView] = useState(2);
  const requestRef = useRef(0);

  useEffect(() => {
    let currentTime = performance.now();
    const VIEWS_COUNT = 3;
    const INTERVAL = 5000;

    requestRef.current = requestAnimationFrame(function changeSlide(tick) {
      if (tick - currentTime > INTERVAL) {
        setActiveView((i) => (i + 1) % VIEWS_COUNT);
        currentTime = tick;
      }
      requestRef.current = requestAnimationFrame(changeSlide);
    });
    return () => cancelAnimationFrame(requestRef.current);
  }, [activeView]);

  return (
    <section
      id="main-banner"
      className={
        "banner" +
        (short ? " banner--short" : "") +
        (announcementVisible ? " banner--with-announcement" : "")
      }
    >
      <div className="banner__container">
        <div className="banner__background"></div>
        {short ? null : (
          <>
            <div className="banner__indicators">
              <button
                onClick={() => setActiveView(0)}
                className={
                  "banner__indicator" +
                  (activeView == 0 ? " banner__indicator--active" : "")
                }
              >
                {activeView == 0 ? (
                  <RiRadioButtonLine />
                ) : (
                  <RiCheckboxBlankCircleFill />
                )}
              </button>
              <button
                onClick={() => setActiveView(1)}
                className={
                  "banner__indicator" +
                  (activeView == 1 ? " banner__indicator--active" : "")
                }
              >
                {activeView == 1 ? (
                  <RiRadioButtonLine />
                ) : (
                  <RiCheckboxBlankCircleFill />
                )}
              </button>
              <button
                onClick={() => setActiveView(2)}
                className={
                  "banner__indicator" +
                  (activeView == 2 ? " banner__indicator--active" : "")
                }
              >
                {activeView == 2 ? (
                  <RiRadioButtonLine />
                ) : (
                  <RiCheckboxBlankCircleFill />
                )}
              </button>
            </div>

            <div className="banner__social-links">
              <SocialIcons vertical />
            </div>

            <div className="banner__main">
              <div
                className={
                  "banner__content" +
                  (activeView == 0 ? " banner__content--active" : "")
                }
              >
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
                    src={BannerImage1}
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

              <div
                className={
                  "banner__content" +
                  (activeView == 1 ? " banner__content--active" : "")
                }
              >
                <div className="banner__headings">
                  <p className="banner__secondary-text">
                    <span>authentic</span> 1980s detailing
                  </p>
                  <h2 className="banner__title-type">pollen</h2>
                  <h3 className="banner__title">retro high og</h3>
                </div>
                <div className="banner__image">
                  <Image
                    layout="responsive"
                    width={220}
                    height={144}
                    src={BannerImage2}
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

              <div
                className={
                  "banner__content" +
                  (activeView == 2 ? " banner__content--active" : "")
                }
              >
                <div className="banner__headings">
                  <p className="banner__secondary-text">
                    <span>elevated</span> new build
                  </p>
                  <h2 className="banner__title-type">SIGNAL BLUE</h2>
                  <h3 className="banner__title">air - mid se</h3>
                </div>
                <div className="banner__image">
                  <Image
                    layout="responsive"
                    width={220}
                    height={144}
                    src={BannerImage3}
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
        )}
      </div>
    </section>
  );
}
