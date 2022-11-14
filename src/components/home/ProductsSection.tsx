import { Product as ProductType } from "@prisma/client";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Link from "next/link";
import { useRef } from "react";

import Product from "../common/Product";
import { ProductComponentType } from "src/types/shared";

export default function ProductsSection({
  title,
  products,
  url,
}: {
  title: string;
  products: ProductComponentType[];
  url: string;
}) {
  const productsComponent = products?.map((product) => (
    <Product {...product} key={product.id} />
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
            className="products-section__scroll-button"
            onClick={() =>
              listRef.current?.scrollBy({
                left: -listRef.current.scrollWidth / 5,
                behavior: "smooth",
              })
            }
          >
            <BsFillArrowLeftCircleFill />
          </button>
          <button
            className="products-section__scroll-button"
            onClick={() =>
              listRef.current?.scrollBy({
                left: listRef.current.scrollWidth / 5,
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
