import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiRadioButtonLine, RiCheckboxBlankCircleFill } from "react-icons/ri";

import { useAnnouncementState } from "@Lib/contexts/UIContext";
import useMouseCoords from "@Lib/hooks/useMouseCoords";
import useScrollTop from "@Lib/hooks/useScrollTop";
import { range } from "@Lib/utils";
import SocialIcons from "./common/SocialButtons";

import BannerImage1 from "@Images/jordan-1-banner.png";
import BannerImage2 from "@Images/jordan-1-banner-2.png";
import BannerImage3 from "@Images/jordan-1-banner-3.png";
import { MoonLoader } from "react-spinners";

const VIEWS_COUNT = 3;
const INTERVAL = 6000;

export default function HeroBanner() {
  const [activeView, setActiveView] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const rAFRef = useRef(0);
  const router = useRouter();

  const announcementVisible = useAnnouncementState();
  const [x, y] = useMouseCoords(bannerRef.current, 25, 100);
  const scrollTop = useScrollTop();

  const short = router.pathname != "/";

  useEffect(() => {
    if (bannerRef.current) {
      let currentTime = performance.now();

      rAFRef.current = requestAnimationFrame(function changeSlide(tick) {
        if (tick - currentTime > INTERVAL) {
          setActiveView((activeView + 1) % VIEWS_COUNT);
          currentTime = tick;
        }
        rAFRef.current = requestAnimationFrame(changeSlide);
      });
      return () => cancelAnimationFrame(rAFRef.current);
    }
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
              {range(0, slidesData.length - 1).map((_, i) => (
                <button
                  aria-label={"slide " + (i+1)}
                  key={"indicator" + i}
                  onClick={() => setActiveView(i)}
                  className={
                    "banner__indicator" +
                    (activeView == i ? " banner__indicator--active" : "")
                  }
                >
                  {activeView == i ? (
                    <RiRadioButtonLine />
                  ) : (
                    <RiCheckboxBlankCircleFill />
                  )}
                </button>
              ))}
            </div>

            <div className="banner__social-links">
              <SocialIcons vertical />
            </div>

            <div className="banner__main">
              {!!bannerRef.current ? (
                <>
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
                          <span>{data.secondary.highlighted}</span>{" "}
                          {data.secondary.text}
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
                            -y * 0.6 + scrollTop * 0.1
                          }px)`,
                        }}
                        className="banner__image"
                      >
                        <Image
                          layout="responsive"
                          width={data.imageSrc.width}
                          height={data.imageSrc.height}
                          src={data.imageSrc}
                          priority
                          alt=""
                        />
                      </div>
                      <div className="banner__action-button">
                        <Link href={data.url}>
                          <a className="banner__action-button-link">
                            <span>buy yours</span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="banner__loader">
                  <MoonLoader className="banner__loader-spinner" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const slidesData = [
  {
    secondary: { highlighted: "verified", text: "authentic sneakers" },
    type: "heirloom",
    title: "retro high og",
    imageSrc: BannerImage1,
    url: "/category/men",
  },
  {
    secondary: { highlighted: "elevated", text: "new build" },
    type: "SIGNAL BLUE",
    title: "air - mid se",
    imageSrc: BannerImage3,
    url: "/product/air-jordan-1-mid-se-signal-blue-dd6834-402",
  },
  {
    secondary: { highlighted: "authentic", text: "1980s detailing" },
    type: "pollen",
    title: "retro high og",
    imageSrc: BannerImage2,
    url: "/product/air-jordan-1-high-retro-og-pollen-555088701",
  },
];
