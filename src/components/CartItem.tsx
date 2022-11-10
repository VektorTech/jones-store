import { CartItem, Product } from "@prisma/client";
import Image from "next/image";
import NumberInput from "./common/formControls/NumberInput";
import { currencyFormatter } from "@Lib/intl";
import Button from "./common/formControls/Button";

export default function CartProductItem({
  product,
  cartItem,
  removeAction,
  updateAction,
}: {
  product: Product;
  cartItem: CartItem;
  removeAction: () => void;
  updateAction: (quantity: number) => void;
}) {
  if (!cartItem || !product) {
    return null;
  }
  return (
    <li className="cart__product">
      <Image
        className="cart__product-image"
        objectFit="contain"
        objectPosition="bottom"
        src={product.mediaURLs[0]}
        width={110}
        height={110}
        layout="fixed"
        alt=""
      />
      <span className="cart__product-title">{product.title}</span>
      <span className="cart__product-gender">{product.gender}</span>
      <span className="cart__product-size">Size: {cartItem.size}</span>
      <span className="cart__product-price">
        {currencyFormatter.format(product.price - (product.discount || 0))}
      </span>
      <span className="cart__product-cost">
        {currencyFormatter.format(
          (product.price - (product.discount || 0)) * cartItem.quantity
        )}
      </span>
      <NumberInput
        className="cart__product-quantity"
        value={cartItem.quantity}
        min={1}
        max={product.stockQty}
        onChange={(value) => updateAction(value)}
      />
      <Button onClick={removeAction} className="cart__product-remove">
        Remove
      </Button>
    </li>
  );
}
