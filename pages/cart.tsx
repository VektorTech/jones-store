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
  const { user, guest } = req.session;

  const select = {
    title: true,
    price: true,
    discount: true,
    mediaURLs: true,
    gender: true,
    ratings: true,
    details: true,
    color: true,
    year: true,
    stockQty: true,
    salesCount: true,
    shippingCost: true,
    sizes: true,
    type: true,
    // review: true,
    sku: true,
    id: true,
  };

  let cartItems = null;
  let cartTotal = 0;
  if (user) {
    const cart = await prisma.cart
      .findUnique({
        where: { userId: user?.id },
      })
      .catch(console.log);

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
  } else if (guest) {
    cartTotal = (guest.cart || []).reduce(
      (total: number, item: any) => total + item.total,
      0
    ) || 0;
    cartItems = await Promise.all(guest.cart.map(async item => {
      const product = await prisma.product.findUnique({ select, where: { id: item.productId } })
      return { ...item, product };
    }));
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
