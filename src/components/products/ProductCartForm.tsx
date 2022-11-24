import { useState, useRef } from "react";
import { PaymentType } from "@prisma/client";

import SizeOptions from "@Components/common/SizeOptions";
import Button from "@Components/formControls/Button";
import NumberInput from "@Components/formControls/NumberInput";

import { useAuthState } from "@Lib/contexts/AuthContext";
import { listToEnum } from "@Lib/utils";
import { ProductComponentType } from "src/types/shared";
import { toast } from "react-toastify";
import { currencyFormatter2 } from "@Lib/intl";

export default function ProductCartForm({
  product,
}: {
  product: ProductComponentType;
}) {
  const [checkedSize, setCheckedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { id, stockQty, price, discount } = product;
  const { addToCart } = useAuthState();
  const sizesValuesRef = useRef(listToEnum(product.sizes));

  return (
    <form method="POST" action="/api/cart">
      <p>
        <strong>Size:</strong> Please Select
      </p>
      <SizeOptions
        values={sizesValuesRef.current}
        onChecked={(items) => setCheckedSize(items as string)}
      />
      <NumberInput
        onChange={(value) => setQuantity(value)}
        value={quantity}
        min={1}
        max={stockQty}
        name="qty"
      />
      <input type="hidden" name="productId" defaultValue={id} />
      <Button
        onClick={(e) => {
          e.preventDefault();
          const size = Number(checkedSize);
          if (quantity && size) {
            addToCart(id, quantity, Number(checkedSize));
          } else {
            toast("Please select size.", { type: "warning" });
          }
        }}
        className="product-cart-form__submit"
        large
        invert
      >
        Add To Cart
      </Button>

      <Button
        type="button"
        className="product-view__buy"
        large
        onClick={() => {
          if (quantity && checkedSize) {
            buyNowHandler(product, quantity, checkedSize);
          } else {
            toast("Please select size.", { type: "warning" });
          }
        }}
      >
        Buy Now &mdash;{" "}
        {currencyFormatter2.format((price - discount) * quantity)}
      </Button>
    </form>
  );
}

const buyNowHandler = (
  product: ProductComponentType,
  quantity: number,
  size: string
) => {
  fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          id: product.id,
          qty: quantity,
          size: size,
        },
      ],
      provider: PaymentType.STRIPE,
    }),
  })
    .then((res) => {
      const resBody = res.json();
      if (res.ok) {
        return resBody;
      }
      return Promise.reject(resBody);
    })
    .then(({ data }) => {
      location.href = data;
    })
    .catch((err) => toast("Please sign in before checkout", { type: "error" }));
};
