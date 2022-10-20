import type { NextPage, GetServerSideProps } from "next";

import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";

import HeroBanner from "@Components/HeroBanner";
import CollectionSection from "@Components/home/CollectionSection";
import ProductsSection from "@Components/home/ProductsSection";
import GenderSection from "@Components/home/GenderSection";
import FeaturesSection from "@Components/home/FeaturesSection";
import { Product } from "@prisma/client";

const Home: NextPage<HomePropTypes> = ({ newArrivals, bestSellers }) => {
  return (
    <>
      <HeroBanner />
      <CollectionSection />
      <ProductsSection
        products={newArrivals}
        title="new arrivals"
        url="/category/new"
      />
      <GenderSection />
      <ProductsSection
        products={bestSellers}
        title="best sellers"
        url="/category/best"
      />
      <FeaturesSection />
    </>
  );
};

// use SSG for loading all & SSR to view individual
export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function ({ params, req }) {
    // const user = req.session.user;

    const productColumns = {
      title: true,
      price: true,
      discount: true,
      mediaURLs: true,
      gender: true,
      ratings: true,
      sku: true,
      id: true,
    };
    const newArrivals =
      (await prisma.product
        .findMany({
          take: 4,
          select: productColumns,
          orderBy: { dateAdded: "desc" },
        })
        .catch(console.log)) || null;

    const bestSellers =
      (await prisma.product
        .findMany({
          take: 4,
          select: productColumns,
          orderBy: { salesCount: "desc" },
        })
        .catch(console.log)) || null;

    return {
      props: {
        newArrivals,
        bestSellers,
      },
    };
  }
);

export default Home;

interface HomePropTypes {
  newArrivals: Product[];
  bestSellers: Product[];
}
