import Product from "@Components/common/Product";
import { Product as ProductType } from "@prisma/client";

export default function ProductsGrid({
  products,
  actions = {},
}: {
  products: ProductType[];
  actions?: { [action: string]: (productId: string) => void };
}) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id}>
          <Product {...product} />
          {Object.keys(actions).map((action) => (
            <button
              key={action + product.id}
              onClick={() => actions[action](product.id)}
            >
              {action}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
