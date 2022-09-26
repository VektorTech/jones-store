import Link from "next/link";
import Image from "next/image";

import jordanLowImage from "@Images/jordan-1-low.jpg";
import jordanMidImage from "@Images/jordan-1-mid.jpg";
import jordanHighImage from "@Images/air-jordan-1-high.webp";

export default function CollectionSection() {
  return (
    <section className="collections">
      <div className="collections__container">
        <h2 className="collections__heading">#shop collections</h2>
        <p className="collections__sub-text">
          winter collections &mdash; new modern design
        </p>
        <div className="collections__grid">
          <div className="collections__block">
            <Link href="/">
              <a>
                <Image alt="" layout="fill" src={jordanMidImage} />
                <div className="collections__block-content">
                  <h3>Medium</h3>
                  <button>
                    <span>discover</span>
                  </button>
                </div>
              </a>
            </Link>
          </div>
          <div className="collections__block">
            <Link href="/">
              <a>
                <Image alt="" layout="fill" src={jordanLowImage} />
                <div className="collections__block-content">
                  <h3>Low</h3>
                  <button>
                    <span>discover</span>
                  </button>
                </div>
              </a>
            </Link>
          </div>
          <div className="collections__block">
            <Link href="/">
              <a>
                <Image alt="" layout="fill" src={jordanHighImage} />
                <div className="collections__block-content">
                  <h3>High</h3>
                  <button>
                    <span>discover</span>
                  </button>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}