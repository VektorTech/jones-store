import type { ProductComponentType } from "src/types/shared";

import Product from "@Components/common/Product";
import MotionElement from "@Components/common/MotionElement";

import { useProductsState } from "@Contexts/ProductsContext";

export default function ProductsGrid({ products, actions = {} }: PropTypes) {
  const { productImagePlaceholders } = useProductsState();
  return (
    <div className="products-grid">
      {products.map((product) => (
        <MotionElement key={product.id}>
          <div>
            <Product
              {...product}
              blurDataUrl={productImagePlaceholders[product.id]}
            />

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
