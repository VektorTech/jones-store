import { withSessionSsr } from "@Lib/withSession";
import { NextPage } from "next";
import prisma from "@Lib/prisma";

import { CartItem, Product as ProductType } from "@prisma/client";
import SEO from "@Components/common/SEO";
import Product from "@Components/common/Product";
import { useAuthState } from "@Lib/contexts/AuthContext";

const CartPage: NextPage<CartPageProps> = ({ products }) => {
  const { removeFromCart } = useAuthState();

  return (
    <div>
      <SEO title="Cart" />

      {products.map(({ product, quantity }) => (
        <div key={product.id}>
          <Product {...product} />
          <div>Quantity: {quantity}</div>
          <button
            onClick={() =>
              removeFromCart(product.id).then(() => location?.reload())
            }
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const { user } = req.session;

  const cart = await prisma.cart
    .findUnique({
      where: { userId: user?.id },
    })
    .catch(console.log);

  let cartItems = null;
  let cartTotal = 0;
  if (cart && typeof cart == "object") {
    cartTotal = cart.total;
    cartItems = await prisma.cartItem
      .findMany({
        where: { cartId: cart.id },
        include: { product: true },
      })
      .then((list) =>
        list.map((cartItem) => ({
          ...cartItem,
          product: { ...cartItem.product, dateAdded: null },
        }))
      )
      .catch(console.log);
  }

  return {
    props: {
      cartTotal,
      products: cartItems,
    },
  };
});

interface CartPageProps {
  products: (CartItem & { product: ProductType })[];
  cartTotal: number;
}

export default CartPage;
