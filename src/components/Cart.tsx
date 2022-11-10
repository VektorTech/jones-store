import Button from "./common/formControls/Button";
import { BsXLg } from "react-icons/bs";
import { useAuthState } from "@Lib/contexts/AuthContext";
import { useEffect, useState } from "react";
import { PaymentType, Product } from "@prisma/client";
import { currencyFormatter } from "@Lib/intl";
import { DialogType, useDialog } from "@Lib/contexts/UIContext";
import CartProductItem from "./CartItem";

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user, addToCart, removeFromCart, emptyCart } = useAuthState();
  const shippingTotalCost = products.reduce(
    (shippingTotal, { shippingCost }) => shippingTotal + shippingCost,
    0
  );
  const { currentDialog, setDialog } = useDialog();
  const active = currentDialog == DialogType.CART;

  useEffect(() => {
    const controller = new AbortController();

    if (active) {
      Promise.all(
        user.cart.map((cartItem) =>
          fetch(`/api/products/${cartItem.productId}`, {
            signal: controller.signal,
          }).then((res) => {
            const respJson = res.json();
            if (res.ok) {
              return respJson.then((res) => res.data);
            }
            return Promise.reject(respJson);
          })
        )
      )
        .then(setProducts)
        .catch(console.log);
    }
    return () => controller.abort();
  }, [user.cart, active]);

  return (
    <div className={"cart" + (active ? " cart--active" : "")}>
      <div onClick={() => setDialog(null)} className="cart__backdrop"></div>
      <div className="cart__container">
        <div className="cart__top">
          <h3 className="cart__heading">Cart {`(${products.length})`}</h3>
          <button onClick={() => emptyCart()} className="cart__clear">
            {"(Clear Cart)"}
          </button>
          <button onClick={() => setDialog(null)} className="cart__close">
            <BsXLg className="sidebar__close-icon" />
          </button>
        </div>
        <div className="cart__content">
          <ul className="cart__list">
            {products.map((product, index) => (
              <CartProductItem
                removeAction={() => removeFromCart(product.id)}
                updateAction={(quantity: number) =>
                  addToCart(product.id, quantity, user.cart[index].size)
                }
                key={`cart-${product.id}`}
                product={product}
                cartItem={user.cart[index]}
              />
            ))}
          </ul>
        </div>
        <div className="cart__checkout">
          <div className="cart__details">
            <p className="cart__sub-total">Sub-total:</p>
            <p className="cart__sub-total-value">
              {currencyFormatter.format(user.cartTotal)}
            </p>
            <p className="cart__shipping">Shipping:</p>
            <p className="cart__shipping-value">
              {currencyFormatter.format(shippingTotalCost)}
            </p>
            <p className="cart__total">Total:</p>
            <p className="cart__total-value">
              {currencyFormatter.format(user.cartTotal + shippingTotalCost)}
            </p>
          </div>
          <Button onClick={checkout} className="cart__checkout-button">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

function checkout() {
  fetch("/api/cart-checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
}
