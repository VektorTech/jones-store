import Image from "next/image";
import { CartItem, Product } from "@prisma/client";

import NumberInput from "./formControls/NumberInput";
import Button from "./formControls/Button";

import { currencyFormatter } from "@Lib/intl";
import React from "react";
import Link from "next/link";
import { getPathString } from "@Lib/utils";

export default function CartProductItem({
  product,
  cartItem,
  index,
  removeAction,
  updateAction,
}: PropTypes) {
  if (!cartItem || !product) {
    return null;
  }
  return (
    <li
      className="cart__product"
      style={{ "--index": index } as React.CSSProperties}
    >
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
      <Link
        href={`/product/${getPathString(product.title + " " + product.sku)}`}
      >
        <a className="cart__product-title">{product.title}</a>
      </Link>
      <span className="cart__product-gender">{product.gender}</span>
      <span className="cart__product-size">Size: {cartItem.size}</span>
      <span className="cart__product-price">
        {currencyFormatter.format(product.price - product.discount)}
      </span>
      <span className="cart__product-cost">
        {currencyFormatter.format(
          (product.price - product.discount) * cartItem.quantity
        )}
      </span>
      <NumberInput
        className="cart__product-quantity"
        value={cartItem.quantity}
        min={1}
        max={product.stockQty}
        name="qty"
        onChange={(value) => updateAction(value)}
      />
      <Button onClick={removeAction} className="cart__product-remove">
        Remove
      </Button>
    </li>
  );
}

interface PropTypes {
  product: Product;
  cartItem: CartItem;
  index: number;
  removeAction: () => void;
  updateAction: (quantity: number) => void;
}
