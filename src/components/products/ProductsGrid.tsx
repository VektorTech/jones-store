import type { ProductComponentType } from "src/types/shared";

import Product from "@Components/common/Product";
import MotionElement from "@Components/common/MotionElement";

import { useProductsState } from "@Contexts/ProductsContext";

export default function ProductsGrid({ products, actions = {} }: PropTypes) {
  const { productImagePlaceholders } = useProductsState();
  return (
    <ul className="products-grid">
      {products.map((product) => (
        <MotionElement key={product.id}>
          <li>
            <ul>
              <Product
                {...product}
                blurDataUrl={productImagePlaceholders[product.id]}
              />

              {Object.keys(actions).map((action) => (
                <li key={action + product.id}>
                  <button onClick={() => actions[action](product.id)}>
                    {action}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </MotionElement>
      ))}
    </ul>
  );
}

interface PropTypes {
  products: ProductComponentType[];
  actions?: { [action: string]: (productId: string) => void };
}
