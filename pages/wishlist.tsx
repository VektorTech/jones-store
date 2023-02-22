import type { ProductComponentType } from "src/types/shared";

import { NextPage } from "next";
import { Wishlist } from "@prisma/client";

import ProductsGrid from "@Components/products/ProductsGrid";

import prisma from "@Lib/prisma";
import { useAuthState } from "@Contexts/AuthContext";
import { withSessionSsr } from "@Lib/withSession";
import Head from "next/head";

const WishlistPage: NextPage<WishlistPageProps> = ({ wishlistItems }) => {
  const { removeFromWishlist } = useAuthState();
  const products = wishlistItems.map(({ product }) => product);

  return (
    <div className="page">
      <div className="page__container">
        <Head>
          <title>Wishlist</title>
        </Head>
        <h1 className="main-heading">Wishlist</h1>
        {products.length ? (
          <ProductsGrid
            actions={{
              Remove: (productId) =>
                removeFromWishlist(productId).then(() => location?.reload()),
            }}
            products={products}
          />
        ) : (
          <h2 className="wishlist__empty">Empty</h2>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const { user, guest } = req.session;

  let wishlistItems: WishlistPageProps["wishlistItems"] = [];

  if (user) {
    const items = await prisma.wishlist
      .findMany({
        where: { userId: user.id },
        include: { product: true },
      })
      .then((list) =>
        list.map((list) => ({
          ...list,
          product: {
            ...list.product,
            dateAdded: list.product.dateAdded.toJSON(),
            ratings: 0,
          },
        }))
      )
      .catch(console.log);

    wishlistItems = items as Exclude<typeof items, void>;
  } else if (guest) {
    wishlistItems = await Promise.all(
      guest.wishlist.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (product) {
          return {
            ...item,
            product: {
              ...product,
              dateAdded: product.dateAdded.toJSON(),
              ratings: 0,
            },
          };
        }
        return item;
      })
    );
  }

  return {
    props: {
      wishlistItems,
    },
  };
});

interface WishlistPageProps {
  wishlistItems: (Wishlist & { product: ProductComponentType })[];
}

export default WishlistPage;
