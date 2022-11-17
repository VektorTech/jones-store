import { BsXLg } from "react-icons/bs";
import { PaymentType } from "@prisma/client";

import Button from "./common/formControls/Button";
import CartProductItem from "./CartItem";

import { useAuthState } from "@Lib/contexts/AuthContext";
import { currencyFormatter } from "@Lib/intl";
import { DialogType, useDialog } from "@Lib/contexts/UIContext";

export default function Cart() {
  const { user, addToCart, removeFromCart, emptyCart } = useAuthState();
  const shippingTotalCost = user.cart.shippingTotal ?? 0;
  const { currentDialog, setDialog } = useDialog();
  const active = currentDialog == DialogType.CART;

  return (
    <div className={"cart" + (active ? " cart--active" : "")}>
      <div onClick={() => setDialog(null)} className="cart__backdrop"></div>
      <div className="cart__container">
        <div className="cart__top">
          <h3 className="cart__heading">Cart {`(${user.cart.count})`}</h3>
          <button onClick={() => emptyCart()} className="cart__clear">
            {"(Clear Cart)"}
          </button>
          <button onClick={() => setDialog(null)} className="cart__close">
            <BsXLg className="sidebar__close-icon" />
          </button>
        </div>
        <div className="cart__content">
          <ul className="cart__list">
            {user.cart.productIds.sort().map((id, index) => (
              <CartProductItem
                removeAction={() => removeFromCart(id)}
                updateAction={(quantity: number) =>
                  addToCart(id, quantity, user.cart.items[id].size)
                }
                key={`cart-${id}`}
                product={user.cart.items[id].product}
                cartItem={user.cart.items[id]}
              />
            ))}
          </ul>
        </div>
        <div className="cart__checkout">
          <div className="cart__details">
            <p className="cart__sub-total">Sub-total:</p>
            <p className="cart__sub-total-value">
              {currencyFormatter.format(user.cart.total)}
            </p>
            <p className="cart__shipping">Shipping:</p>
            <p className="cart__shipping-value">
              {currencyFormatter.format(shippingTotalCost)}
            </p>
            <p className="cart__total">Total:</p>
            <p className="cart__total-value">
              {currencyFormatter.format(user.cart.total + shippingTotalCost)}
            </p>
          </div>
          <Button onClick={stripeCheckout} className="cart__checkout-button">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

function stripeCheckout() {
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
