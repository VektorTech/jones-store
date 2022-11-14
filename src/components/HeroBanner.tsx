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
import useMouseCoords from "@Lib/hooks/useMouseCoords";
import useScrollTop from "@Lib/hooks/useScrollTop";

const slidesData = [
  {
    secondary: { main: "verified", rest: "authentic sneakers" },
    type: "heirloom",
    title: "retro high og",
    imageSrc: BannerImage1,
    actionUrl: "/category/men/retro-high-og",
  },
  {
    secondary: { main: "elevated", rest: "new build" },
    type: "SIGNAL BLUE",
    title: "air - mid se",
    imageSrc: BannerImage3,
    actionUrl: "/category/men/retro-high-og",
  },
  {
    secondary: { main: "authentic", rest: "1980s detailing" },
    type: "pollen",
    title: "retro high og",
    imageSrc: BannerImage2,
    actionUrl: "/category/men/retro-high-og",
  },
];

export default function HeroBanner() {
  const announcementVisible = useAnnouncementState();
  const router = useRouter();
  const short = router.pathname != "/";

  const [activeView, setActiveView] = useState(2);
  const rAFRef = useRef(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [x, y] = useMouseCoords(bannerRef.current, 25, 100);
  const scrollTop = useScrollTop();

  useEffect(() => {
    let currentTime = performance.now();
    const VIEWS_COUNT = 3;
    const INTERVAL = 6000;

    rAFRef.current = requestAnimationFrame(function changeSlide(tick) {
      if (tick - currentTime > INTERVAL) {
        setActiveView((i) => (i + 1) % VIEWS_COUNT);
        currentTime = tick;
      }
      rAFRef.current = requestAnimationFrame(changeSlide);
    });
    return () => cancelAnimationFrame(rAFRef.current);
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
      <div ref={bannerRef} className="banner__container">
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
              {slidesData.map((data, i) => (
                <div
                  key={data.title + data.type}
                  className={
                    "banner__content" +
                    (activeView == i ? " banner__content--active" : "")
                  }
                >
                  <div className="banner__headings">
                    <p className="banner__secondary-text">
                      <span>{data.secondary.main}</span> {data.secondary.rest}
                    </p>
                    <h2
                      style={{ transform: `translateX(${-x * 0.3}px)` }}
                      className="banner__title-type"
                    >
                      {data.type}
                    </h2>
                    <h3 className="banner__title">
                      <span>{data.title}</span>
                    </h3>
                  </div>
                  <div
                    style={{
                      transform: `translate(${-x * 1.2}px, ${
                        -y * 0.4 + scrollTop * 0.1
                      }px)`,
                    }}
                    className="banner__image"
                  >
                    <Image
                      layout="responsive"
                      width={220}
                      height={144}
                      src={data.imageSrc}
                      alt=""
                    />
                  </div>
                  <div className="banner__action-button">
                    <Link href={data.actionUrl}>
                      <a className="banner__action-button-element">
                        <span>buy yours</span>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
