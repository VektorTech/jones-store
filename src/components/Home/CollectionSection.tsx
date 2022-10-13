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
            <h2 className="collections__heading">check out our collections</h2>
            <p className="collections__sub-heading">
              winter collections &mdash; new modern design
            </p>
          </div>
          <div className="collections__block">
            <Link href="/category/type/low">
              <a className="collections__block-link">
                <Image
                  className="collections__block-image"
                  alt=""
                  layout="fill"
                  src={jordanLowImage}
                />
                <div className="collections__block-content">
                  <h3 className="collections__block-title">Low</h3>
                  <p className="collections__block-action-text">
                    <span>discover</span>
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="collections__block">
            <Link href="/category/type/mid">
              <a className="collections__block-link">
                <Image
                  className="collections__block-image"
                  alt=""
                  layout="fill"
                  src={jordanMidImage}
                />
                <div className="collections__block-content">
                  <h3 className="collections__block-title">Mid</h3>
                  <p className="collections__block-action-text">
                    <span>discover</span>
                  </p>
                </div>
              </a>
            </Link>
          </div>
          <div className="collections__block">
            <Link href="/category/type/high">
              <a className="collections__block-link">
                <Image
                  className="collections__block-image"
                  alt=""
                  layout="fill"
                  src={jordanHighImage}
                />
                <div className="collections__block-content">
                  <h3 className="collections__block-title">High</h3>
                  <p className="collections__block-action-text">
                    <span>discover</span>
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
