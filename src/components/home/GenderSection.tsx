import Link from "next/link";
import Image from "next/image";

import manImage from "@Images/man.jpg";
import womanImage from "@Images/woman.jpg";
import kidImage from "@Images/kid.webp";
import babyImage from "@Images/baby.jpeg";
import unisexImage from "@Images/unisex.jpg";

export default function GenderSection() {
  return (
    <section className="gender">
      <div className="gender__container">
        <div className="gender__grid">
          <div className="gender__block gender__block-men">
            <Link href="/category/men">
              <a className="gender__block-link">
                <Image alt="" layout="fill" src={manImage} />
                <h3 className="gender__block-title">
                  <span>shop Men</span>
                </h3>
              </a>
            </Link>
          </div>
          <div className="gender__block gender__block-women">
            <Link href="/category/women">
              <a className="gender__block-link">
                <Image alt="" layout="fill" src={womanImage} />
                <h3 className="gender__block-title">
                  <span>shop Women</span>
                </h3>
              </a>
            </Link>
          </div>
          <div className="gender__block gender__block-kids">
            <Link href="/category/kids">
              <a className="gender__block-link">
                <Image alt="" layout="fill" src={kidImage} />
                <h3 className="gender__block-title">
                  <span>shop Kids</span>
                </h3>
              </a>
            </Link>
          </div>
          <div className="gender__block gender__block-babies">
            <Link href="/category/baby">
              <a className="gender__block-link">
                <Image alt="" layout="fill" src={babyImage} />
                <h3 className="gender__block-title">
                  <span>shop Babies</span>
                </h3>
              </a>
            </Link>
          </div>
          <div className="gender__block gender__block-unisex">
            <Link href="/category/unisex">
              <a className="gender__block-link">
                <Image alt="" layout="fill" src={unisexImage} />
                <h3 className="gender__block-title">
                  <span>shop Unisex</span>
                </h3>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
