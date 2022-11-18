import type { ProductComponentType } from "src/types/shared";

import Product from "@Components/common/Product";
import MotionElement from "@Components/common/MotionElement";

export default function ProductsGrid({ products, actions = {} }: PropTypes) {
  return (
    <div className="products-grid">
      {products.map((product, i) => (
        <MotionElement key={product.id}>
          <div>
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
        </MotionElement>
      ))}
    </div>
  );
}

interface PropTypes {
  products: ProductComponentType[];
  actions?: { [action: string]: (productId: string) => void };
}
