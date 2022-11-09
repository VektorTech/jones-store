import { useState, Suspense } from "react";
import RadioList from "@Components/common/formControls/RadioList";
import { listToEnum } from "@Lib/utils";
import SizeOptions from "@Components/common/SizeOptions";
import { Product } from "@prisma/client";
import Button from "@Components/common/formControls/Button";
import { useAuthState } from "@Lib/contexts/AuthContext";

export default function ProductCartForm({ product }: { product: Product }) {
  const [checkedSize, setCheckedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const {
    id,
    title,
    gender,
    price,
    discount,
    sku,
    year,
    color,
    salesCount,
    stockQty,
    sizes: sizesOptions,
  } = product;
  const { addToCart } = useAuthState();

  // const allSizes = listToEnum(sizesOptions);

  return (
    <form method="POST" action="/api/cart">
      {/* <div className="product-view__size-selector">
              <RadioList
                name="sizes"
                label="Size: Please Select"
                grid
                values={allSizes}
                checkedItems={[checkedSize]}
                onChecked={(value) => setCheckedSize(value as string)}
                render={({ label, checked }) => (
                  <span
                    className={
                      "filter__param-box" +
                      (checked ? " filter__param-box--checked" : "")
                    }
                  >
                    {label}
                  </span>
                )}
              />
            </div> */}
      <SizeOptions />
      <div className="product-cart-form__quantity">
        <button
          onClick={() => setQuantity(Math.max(quantity - 1, 1))}
          type="button"
        >
          {" "}
          -{" "}
        </button>
        <input readOnly name="qty" key={quantity} defaultValue={quantity} />
        <button
          onClick={() => setQuantity(Math.min(quantity + 1, stockQty))}
          type="button"
        >
          {" "}
          +{" "}
        </button>
      </div>
      <input type="hidden" name="productId" defaultValue={id} />
      <Button
        onClick={(e) => {
          e.preventDefault();
          addToCart(id, quantity, Number(checkedSize));
        }}
        className="product-cart-form__submit"
      >
        Add To Cart
      </Button>
    </form>
  );
}
