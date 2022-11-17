import { useState } from "react";
import { Product, PaymentType } from "@prisma/client";

import SizeOptions from "@Components/common/SizeOptions";
import Button from "@Components/common/formControls/Button";
import NumberInput from "@Components/common/formControls/NumberInput";

import { useAuthState } from "@Lib/contexts/AuthContext";

export default function ProductCartForm({ product }: { product: Product }) {
  const [checkedSize, setCheckedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { id, stockQty } = product;
  const { addToCart } = useAuthState();

  return (
    <form method="POST" action="/api/cart">
      <p>
        <strong>Size:</strong> Please Select
      </p>
      <SizeOptions onChecked={(items) => setCheckedSize(items as string)} />
      <NumberInput
        onChange={(value) => setQuantity(value)}
        value={quantity}
        min={1}
        max={stockQty}
      />
      <input type="hidden" name="productId" defaultValue={id} />
      <Button
        onClick={(e) => {
          e.preventDefault();
          addToCart(id, quantity, Number(checkedSize));
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
        onClick={() => buyNowHandler(product, quantity, checkedSize)}
      >
        Buy Now
      </Button>
    </form>
  );
}

const buyNowHandler = (product: Product, quantity: number, size: string) => {
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
    .catch((err) => console.error(err.error));
};
