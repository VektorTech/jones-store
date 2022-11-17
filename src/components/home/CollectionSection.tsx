import Link from "next/link";
import Image from "next/image";

import jordanLowImage from "@Images/jordan-1-low.jpg";
import jordanMidImage from "@Images/jordan-1-mid.jpg";
import jordanHighImage from "@Images/air-jordan-1-high.webp";

export default function CollectionSection() {
  return (
    <section className="collections">
      <div className="collections__container">
        <div className="collections__grid">
          <div className="collections__block collections__block--text">
            <h2 className="collections__heading">
              check out our winter collections
            </h2>
            <p className="collections__sub-text">
              Winter Collections &mdash; New Modern Design
            </p>

            <p className="collections__sub-text">
              We&rsquo;ve gathered the latest models for you to consider adding
              to your winter lineup, check and see which ones can complete your
              wardrobe this season.
            </p>
          </div>
          {collectionImages.map(({ href, imageSrc, title }) => (
            <div key={title} className="collections__block">
              <Link href={href}>
                <a className="collections__block-link">
                  <Image
                    className="collections__block-image"
                    alt=""
                    layout="fill"
                    src={imageSrc}
                  />
                  <div className="collections__block-content">
                    <h3 className="collections__block-title">{title}</h3>
                    <p className="collections__block-action-text">
                      <span>discover</span>
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const collectionImages = [
  {
    href: "/category/type/low",
    imageSrc: jordanLowImage,
    title: "Low",
  },
  {
    href: "/category/type/mid",
    imageSrc: jordanMidImage,
    title: "Mid",
  },
  {
    href: "/category/type/high",
    imageSrc: jordanHighImage,
    title: "High",
  },
];
