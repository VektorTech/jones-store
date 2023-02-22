import Image from "next/image";
import FutureImage from "next/future/image";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import Carousel from "@Components/Carousel";
import { useAuthState } from "@Contexts/AuthContext";
import { ProductPlaceholderImg } from "src/constants";
import { ProductComponentType } from "src/types/shared";

export default function ProductGallery({
  product,
  images,
  dimensions,
  blurDataUrls,
}: PropTypes) {
  const [activeImage, setActiveImage] = useState(0);
  const { addToWishlist, removeFromWishlist, user } = useAuthState();
  const isOnWishlist = !!user.wishlist.items[product.id];

  return (
    <div className="product-gallery">
      <div className="product-gallery__container">
        <div className="product-gallery__images">
          <ul>
            {images.map((url, i) => (
              <li key={url}>
                <button
                  className={
                    i == activeImage ? "product-gallery__thumb-active" : ""
                  }
                  onClick={() => setActiveImage(i)}
                >
                  <Image
                    objectFit="contain"
                    src={url}
                    width={80}
                    height={60}
                    placeholder="blur"
                    blurDataURL={blurDataUrls[url] || ProductPlaceholderImg}
                    layout="responsive"
                    alt=""
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-gallery__picture">
          <div className="product-gallery__picture-container">
            <Carousel
              onUpdate={(i: number) => setActiveImage(i)}
              aIndex={activeImage}
              key={`carousel-${product.id}`}
            >
              {images.map((url, i) => (
                <FutureImage
                  className="product-gallery__image"
                  key={"image:" + url}
                  priority
                  src={url}
                  onClick={() => window.open(url, "_blank")}
                  placeholder="blur"
                  blurDataURL={blurDataUrls[url] || ProductPlaceholderImg}
                  width={dimensions[i]?.width ?? 0}
                  height={dimensions[i]?.height ?? 0}
                  alt=""
                />
              ))}
            </Carousel>
          </div>
          <button
            aria-label="add to wishlist"
            disabled={user.processing}
            onClick={() =>
              isOnWishlist
                ? removeFromWishlist(product.id)
                : addToWishlist(product)
            }
            className="product-gallery__wish"
          >
            {isOnWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      </div>
    </div>
  );
}

interface PropTypes {
  product: ProductComponentType;
  images: string[];
  dimensions: { width: number; height: number }[];
  blurDataUrls: Record<string, string>;
}
