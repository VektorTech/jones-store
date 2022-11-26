import { useRef } from "react";

import Link from "next/link";
import Image from "next/image";

import womanTallImage from "@Images/pexels-theia-sight-4932179.jpg";
import manImage from "@Images/man.jpg";
import womanImage from "@Images/woman.jpg";
import kidImage from "@Images/kid.webp";
import babyImage from "@Images/baby.jpeg";
import unisexImage from "@Images/unisex.jpg";
import useIntersectionObserver from "@Lib/hooks/useIntersectionObserver";

export default function GenderSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useIntersectionObserver(ref, true);

  return (
    <section
      ref={ref}
      className={`gender${inView ? " gender--intersected" : ""}`}
    >
      <div className="gender__container">
        <div className="gender__tall-img">
          <Image
            alt=""
            objectFit="cover"
            objectPosition="bottom"
            layout="fill"
            src={womanTallImage}
          />
          <h3 className="gender__text-overlay">
            Gender
            <br />
            Collections
          </h3>
        </div>
        <div className="gender__grid">
          {genderSectionBlocks.map(({ className, href, imgSource, title }) => (
            <div key={className} className={"gender__block " + className}>
              <Link href={href}>
                <a className="gender__block-link">
                  <Image alt="" layout="fill" src={imgSource} />
                  <h3 className="gender__block-title">
                    <span>{title}</span>
                  </h3>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const genderSectionBlocks = [
  {
    className: "gender__block-men",
    href: "/category/men",
    imgSource: manImage,
    title: "Shop Men",
  },
  {
    className: "gender__block-women",
    href: "/category/women",
    imgSource: womanImage,
    title: "Shop Women",
  },
  {
    className: "gender__block-kids",
    href: "/category/kids",
    imgSource: kidImage,
    title: "Shop Kids",
  },
  {
    className: "gender__block-babies",
    href: "/category/baby",
    imgSource: babyImage,
    title: "Shop Babies",
  },
  {
    className: "gender__block-unisex",
    href: "/category/unisex",
    imgSource: unisexImage,
    title: "Shop Unisex",
  },
];
