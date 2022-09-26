import Link from "next/link";

import Product from "../common/Product";

export default function ProductsSection({ title }: { title: string }) {
  return (
    <section className="products-section">
      <div className="products-section__container">
        <h2 className="products-section__heading">#shop {title}</h2>
        <div className="products-section__products">
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
        <p className="products-section__products-link">
          <Link href="/">
            <a>View All {title}</a>
          </Link>
        </p>
      </div>
    </section>
  );
}