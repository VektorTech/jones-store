import { withSessionSsr } from "@Lib/withSession";
import { NextPage } from "next";
import prisma from "@Lib/prisma";

import { Wishlist, Product } from "@prisma/client";
import SEO from "@Components/common/SEO";

const WishlistPage: NextPage<WishlistPageProps> = ({ wishlistItems }) => {
  return (
    <div>
      <SEO title="Wishlist" />
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

  let wishlistItems = null;
  if (user) {
    wishlistItems = await prisma.wishlist
      .findMany({
        where: { userId: user?.id },
        include: { product: true },
      })
      .then((list) =>
        list.map(({ product }) => ({ ...product, dateAdded: null }))
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
        return { ...item, product };
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
  wishlistItems: (Wishlist & { product: Product })[];
}

export default WishlistPage;
