import type { NextPage, GetServerSideProps } from "next";

import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";

import CollectionSection from "@Components/home/CollectionSection";
import ProductsSection from "@Components/home/ProductsSection";
import GenderSection from "@Components/home/GenderSection";
import FeaturesSection from "@Components/home/FeaturesSection";
import { Product } from "@prisma/client";
import { ProductComponentType } from "src/types/shared";

const Home: NextPage<HomePropTypes> = ({ newArrivals, bestSellers }) => {
  return (
    <>
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
      sku: true,
      id: true,
    };
    const newArrivals = await Promise.all(
      (
        await prisma.product.findMany({
          take: 5,
          select: productColumns,
          orderBy: { dateAdded: "desc" },
        })
      ).map(async (p) => ({
        ...p,
        ratings: await prisma.review.aggregate({
          where: { productId: p.id },
          _avg: { rating: true },
        }),
      }))
    );

    const bestSellers = await Promise.all(
      (
        await prisma.product.findMany({
          take: 5,
          select: productColumns,
          orderBy: { salesCount: "desc" },
        })
      ).map(async (p) => ({
        ...p,
        ratings: await prisma.review.aggregate({
          where: { productId: p.id },
          _avg: { rating: true },
        }),
      }))
    );

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
  newArrivals: ProductComponentType[];
  bestSellers: ProductComponentType[];
}
