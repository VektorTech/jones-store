import type { ProductComponentType } from "src/types/shared";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import RatingStars from "./RatingStars";

import { getPathString } from "src/utils";
import { useAuthState } from "@Lib/contexts/AuthContext";
import { currencyFormatter } from "src/intl";
import { DefaultPlaceholder } from "src/constants";

const MAX_IMAGE_SLIDES = 3;

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
  blurDataUrl,
}: ProductComponentType) {
  const { addToWishlist, removeFromWishlist, user } = useAuthState();
  const isOnWishlist = !!user.wishlist.items[id];
  const handleWishlistAction = () => {
    if (isOnWishlist) {
      return removeFromWishlist(id);
    }
    addToWishlist(id);
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
          <article className="product__wrapper">
            <div className="product__image">
              {mediaURLs.slice(0, MAX_IMAGE_SLIDES).map((url, i) => (
                <Image
                  key={url}
                  src={url}
                  blurDataURL={blurDataUrl || DefaultPlaceholder}
                  placeholder="blur"
                  objectFit="contain"
                  layout="fill"
                  className={`product__image-img${
                    i == imageIndex % MAX_IMAGE_SLIDES
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
                  aria-label="Add to wishlist"
                  onClick={(e) => {
                    e.preventDefault();
                    handleWishlistAction();
                  }}
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
              <p title={title} className="product__title">
                {title}
              </p>
              <div className="product__rating">
                <RatingStars count={ratings} />
              </div>
              <p className="product__price">
                <span className="product__amount">
                  {currencyFormatter.format(price - discount)}
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
          </article>
        </a>
      </Link>
    </div>
  );
}
