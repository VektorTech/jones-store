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
  const { user } = req.session;

  const wishlistItems = await prisma.wishlist
    .findMany({
      where: { userId: user?.id },
      include: { product: true },
    })
    .then(list => list.map(({product}) => ({...product, dateAdded: null})))
    .catch(console.log);

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