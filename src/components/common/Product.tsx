import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import RatingStars from "./RatingStars";
import { MouseEventHandler, useRef, useState } from "react";
import { getPathString } from "@Lib/utils";
import { ProductComponentType } from "src/types/shared";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

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
  isOnWishlist = false,
  onWishlistAction,
}: ProductComponentType) {
  const wishlistHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onWishlistAction?.(id, isOnWishlist);
  };

  const [imageIndex, setImageIndex] = useState(0);
  const timer = useRef<NodeJS.Timer>();

  return (
    <div
      className={`product${small ? " product--small" : ""}`}
      onPointerEnter={() => {
        clearInterval(timer.current);
        setImageIndex(1);
        timer.current = setInterval(() => {
          setImageIndex((index) => index + 1);
        }, 1000);
      }}
      onPointerLeave={() => {
        clearInterval(timer.current);
        setImageIndex(0);
      }}
    >
      <Link href={`/product/${getPathString(title + " " + sku)}`}>
        <a>
          <div className="product__wrapper">
            <div className="product__image">
              {mediaURLs.map((url, i) => (
                <Image
                  key={url}
                  src={url}
                  objectFit="contain"
                  layout="fill"
                  className={`product__image-img${
                    i == imageIndex % mediaURLs.length
                      ? " product__image-img--active"
                      : ""
                  }`}
                  alt=""
                />
              ))}
              {discount ? <span className="product__tag">sale</span> : null}
              <div className="product__actions">
                <button
                  tabIndex={-1}
                  onClick={wishlistHandler}
                  className="product__add-wishlist"
                >
                  {isOnWishlist ? (
                    <AiFillHeart className="product__add-wishlist-icon" />
                  ) : (
                    <AiOutlineHeart className="product__add-wishlist-icon" />
                  )}
                </button>
              </div>
            </div>
            <div className="product__info">
              <p className="product__type">{gender}</p>
              <h3 title={title} className="product__title">
                {title}
              </h3>
              <div className="product__rating">
                <RatingStars count={ratings || 0} />
              </div>
              <p className="product__price">
                <span className="product__amount">
                  {currencyFormatter.format(price - (discount || 0))}
                </span>

                {discount ? (
                  <>
                    <span className="product__discount-percentage">
                      {Math.floor((discount / price) * 100)}% off
                    </span>
                    <span className="product__old-price">
                      <span className="product__old-amount">
                        {currencyFormatter.format(price)}
                      </span>
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
