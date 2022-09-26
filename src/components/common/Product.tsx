import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

import RatingStars from "./RatingStars";

export default function Product() {
  return (
    <div className="product">
      <Link href="">
        <a>
          <div className="product__wrapper">
            <div className="product__image">
              <Image
                src="/assets/images/jordan-1-product-img.jpeg"
                objectFit="cover"
                objectPosition={"center top"}
                layout="fill"
                alt=""
              />
              <span className="product__tag">sale</span>
              <div className="product__actions">
                <button className="product__add-wishlist">
                  <AiOutlineHeart />
                </button>
              </div>
            </div>
            <div className="product__info">
              <p className="product__type">jordan</p>
              <h3 className="product__title">
                Zoom Air Comfort High {"(Women)"}
              </h3>
              <div className="product__rating">
                <RatingStars count={3.8} />
              </div>
              <p className="product__price">
                <span className="product__currency">JMD</span>
                <span className="product__amount">$8,781.80</span>
                <span className="product__discount-percentage">
                  {"(40% off)"}
                </span>

                <span className="product__discount-price">
                  <span className="product__currency">JMD</span>
                  <span className="product__amount">$14,636.34</span>
                </span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
