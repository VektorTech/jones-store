import { useState } from "react";
import SizeOptions from "@Components/common/SizeOptions";
import { Product } from "@prisma/client";
import Button from "@Components/common/formControls/Button";
import { useAuthState } from "@Lib/contexts/AuthContext";
import NumberInput from "@Components/common/formControls/NumberInput";

export default function ProductCartForm({ product }: { product: Product }) {
  const [checkedSize, setCheckedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { id, stockQty } = product;
  const { addToCart } = useAuthState();

  return (
    <form method="POST" action="/api/cart">
      <p>Size: Please Select</p>
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
      >
        Add To Cart
      </Button>
    </form>
  );
}
