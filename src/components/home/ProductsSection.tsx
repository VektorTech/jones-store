import type { ProductComponentType } from "src/types/shared";

import Link from "next/link";
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import Product from "../common/Product";

export default function ProductsSection({
  title,
  products,
  url,
  productImageDataUrls,
}: PropTypes) {
  const productsComponent = products.map((product) => (
    <Product
      {...product}
      key={product.id}
      blurDataUrl={productImageDataUrls[product.id]}
    />
  ));
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <section className="products-section">
      <div className="products-section__container">
        <h2 className="products-section__heading">#shop {title}</h2>
        <div ref={listRef} className="products-section__products">
          {productsComponent}
        </div>
        <div className="products-section__scroll">
          <button
            aria-label="previous product"
            className="products-section__scroll-button"
            onClick={() =>
              listRef.current?.scrollBy({
                left: -listRef.current?.scrollWidth / products.length,
                behavior: "smooth",
              })
            }
          >
            <BsFillArrowLeftCircleFill />
          </button>
          <button
            aria-label="next product"
            className="products-section__scroll-button"
            onClick={() =>
              listRef.current?.scrollBy({
                left: listRef.current?.scrollWidth / products.length,
                behavior: "smooth",
              })
            }
          >
            <BsFillArrowRightCircleFill />
          </button>
        </div>
        <p className="products-section__products-link">
          <Link href={url}>
            <a>View All {title}</a>
          </Link>
        </p>
      </div>
    </section>
  );
}

interface PropTypes {
  title: string;
  products: ProductComponentType[];
  url: string;
  productImageDataUrls: Record<string, string>;
}
