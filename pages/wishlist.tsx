import type { ProductComponentType } from "src/types/shared";

import { NextPage } from "next";
import { Wishlist } from "@prisma/client";

import SEO from "@Components/common/SEO";
import ProductsGrid from "@Components/products/ProductsGrid";

import prisma from "@Lib/prisma";
import { useAuthState } from "@Lib/contexts/AuthContext";
import { withSessionSsr } from "@Lib/withSession";

const WishlistPage: NextPage<WishlistPageProps> = ({ wishlistItems }) => {
  const { removeFromWishlist } = useAuthState();

  return (
    <div>
      <SEO title="Wishlist" />
      <ProductsGrid
        actions={{
          Remove: (productId) =>
            removeFromWishlist(productId).then(() => location?.reload()),
        }}
        products={wishlistItems as ProductComponentType[]}
      />
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
    details: true,
    color: true,
    year: true,
    stockQty: true,
    salesCount: true,
    shippingCost: true,
    sizes: true,
    type: true,
    sku: true,
    id: true,
  };

  let wishlistItems = null;
  if (user) {
    wishlistItems = await prisma.wishlist
      .findMany({
        where: { userId: user?.id },
        include: { product: true },
      })
      .then((list) =>
        list.map(({ product }) => ({ ...product, dateAdded: null, ratings: 0 }))
      )
      .catch(console.log);
  } else if (guest) {
    wishlistItems = guest.wishlist;

    wishlistItems = await Promise.all(
      guest.wishlist.map(async (item) => {
        const product = await prisma.product.findUnique({
          select,
          where: { id: item.productId },
        });
        return { ...item, ...product, ratings: 0 };
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
  wishlistItems: (Wishlist & ProductComponentType)[];
}

export default WishlistPage;
