import Carousel from "@Components/Carousel";
import Image from "next/image";
import Img from "next/future/image";
import { useState, Suspense } from "react";
import { AiOutlineHeart } from "react-icons/ai";

export default function ProductGallery({
  images,
  dimensions,
}: {
  images: string[];
  dimensions: { width: number; height: number }[];
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="product-view__gallery">
      <div className="product-view__gallery-container">
        <div className="product-view__images">
          <ul>
            {images.map((url, i) => (
              <li key={url}>
                <button
                  className={
                    i == activeImage ? "product-view__thumb-active" : ""
                  }
                  onClick={() => setActiveImage(i)}
                >
                  <Image
                    objectFit="contain"
                    src={url}
                    width={80}
                    height={60}
                    layout="responsive"
                    alt=""
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-view__picture">
          <div className="product-view__picture-container">
            <Carousel
              onUpdate={(i: number) => setActiveImage(i)}
              aIndex={activeImage}
              //   key={product.id + "carousel"}
            >
              {images.map((url, i) => (
                <Img
                  key={"image:" + url}
                  style={{
                    objectPosition: "top",
                    objectFit: "contain",
                    height: "100%",
                    position: "static",
                  }}
                  src={url}
                  width={dimensions[i].width}
                  height={dimensions[i].height}
                  alt=""
                />
              ))}
            </Carousel>
          </div>
          <button className="product-view__wish">
            <AiOutlineHeart />
          </button>
        </div>
      </div>
    </div>
  );
}
