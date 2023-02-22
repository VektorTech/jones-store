import type { ProductComponentType } from "src/types/shared";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import RatingStars from "./RatingStars";

import { getPathString } from "src/utils";
import { useAuthState } from "@Contexts/AuthContext";
import { ProductPlaceholderImg } from "src/constants";
import { useCurrencyFormatter } from "@Contexts/UIContext";

const MAX_IMAGE_SLIDES = 3;

export default function Product(props: ProductComponentType) {
  const {
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
  } = props;

  const format = useCurrencyFormatter();
  const { addToWishlist, removeFromWishlist, user } = useAuthState();
  const isOnWishlist = !!user.wishlist.items[id];
  const handleWishlistAction = () => {
    if (isOnWishlist) {
      return removeFromWishlist(id);
    }
    addToWishlist(props);
  };

  const [imageIndex, setImageIndex] = useState(0);
  const timer = useRef<NodeJS.Timer>();

  return (
    <li
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
              {mediaURLs.slice(0, MAX_IMAGE_SLIDES).map((url, i) => (
                <Image
                  key={url}
                  src={url}
                  blurDataURL={blurDataUrl || ProductPlaceholderImg}
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
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label="Add to wishlist"
                  aria-disabled={user.processing}
                  onClick={(e) => {
                    if (user.processing) return;
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
                </span>
              </div>
            </div>
            <article className="product__info">
              <header>
                <p className="product__type">{gender}</p>
                <h3 title={title} className="product__title">
                  {title}
                </h3>
              </header>
              <div className="product__rating">
                <RatingStars count={ratings} />
              </div>
              <p className="product__price">
                <span className="product__amount">
                  {format(price - discount)}
                </span>

                {discount ? (
                  <>
                    <span className="product__discount-percentage">
                      {Math.floor((discount / price) * 100)}% off
                    </span>
                    <span className="product__old-price">
                      <span className="product__old-amount">
                        {format(price)}
                      </span>
                    </span>
                  </>
                ) : null}
              </p>
            </article>
          </div>
        </a>
      </Link>
    </li>
  );
}
