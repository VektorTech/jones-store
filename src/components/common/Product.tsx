import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";

import RatingStars from "./RatingStars";
import { Product as ProductType } from "@prisma/client";
import { MouseEventHandler } from "react";
import { getURLString } from "@Lib/utils";

export default function Product({
  small = false,
  title,
  price,
  discount,
  mediaURLs,
  gender,
  ratings,
  sku,
  id,
}: { small?: boolean } & ProductType) {
  const wishlistHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ productId: id }),
    })
      .then((res) => res.json())
      .catch(console.log);
  };

  return (
    <div className={`product${small ? " product--small" : ""}`}>
      <Link href={`/product/${getURLString(title + " " + sku)}`}>
        <a>
          <div className="product__wrapper">
            <div className="product__image">
              <Image
                src={mediaURLs[0]}
                objectFit="contain"
                objectPosition={"center top"}
                layout="fill"
                className="product__image-img"
                alt=""
              />
              {discount ? <span className="product__tag">sale</span> : null}
              <div className="product__actions">
                <button
                  onClick={wishlistHandler}
                  className="product__add-wishlist"
                >
                  <AiOutlineHeart className="product__add-wishlist-icon" />
                </button>
              </div>
            </div>
            <div className="product__info">
              <p className="product__type">{gender}</p>
              <h3 className="product__title">{title}</h3>
              <div className="product__rating">
                <RatingStars count={3.8} />
              </div>
              <p className="product__price">
                <span className="product__currency">USD</span>
                <span className="product__amount">
                  ${price - (discount || 0)}
                </span>

                {discount ? (
                  <>
                    <span className="product__discount-percentage">
                      {Math.floor((discount / price) * 100)}% off
                    </span>
                    <span className="product__old-price">
                      <span className="product__old-currency">USD</span>
                      <span className="product__old-amount">${price}</span>
                    </span>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
