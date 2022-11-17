import type { ProductComponentType } from "src/types/shared";

import Product from "@Components/common/Product";

export default function ProductsGrid({ products, actions = {} }: PropTypes) {
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

interface PropTypes {
  products: ProductComponentType[];
  actions?: { [action: string]: (productId: string) => void };
}
