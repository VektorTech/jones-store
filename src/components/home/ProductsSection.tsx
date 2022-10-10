import { Product as ProductType } from "@prisma/client";
import Link from "next/link";

import Product from "../common/Product";

export default function ProductsSection({ title, products }: { title: string, products: ProductType[] }) {
  return (
    <section className="products-section">
      <div className="products-section__container">
        <h2 className="products-section__heading">#shop {title}</h2>
        <div className="products-section__products">
          {
            products?.map(product => <Product {...product} key={product.id} />)
          }
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
