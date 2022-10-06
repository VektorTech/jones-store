import type { NextPage, GetServerSideProps } from "next";
// import { useEffect } from 'react';

import { withSessionSsr } from "@Lib/withSession";
import prisma from '@Lib/prisma';

import HeroBanner from "@Components/home/HeroBanner";
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
      <ProductsSection products={newArrivals} title="new arrivals" />
      <GenderSection />
      <ProductsSection products={bestSellers} title="best sellers" />
      <FeaturesSection />
    </>
  );
};

// use SSG for loading all & SSR to view individual
export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function ({ params, req }) {
    // const user = req.session.user;
    // const results = await prisma.user.findMany();
    const productColumns = { title: true, price: true, discount: true, mediaURLs: true, gender: true, ratings: true, id: true }
    const newArrivals = await prisma.product.findMany({
      take: 4,
      select: productColumns,
      orderBy: { dateAdded: "asc" }
    });
    const bestSeller = await prisma.product.findMany({
      take: 4,
      select: productColumns,
      orderBy: { salesCount: "asc" }
    });

    return {
      props: {
        newArrivals,
        bestSeller
        // users: results.map(_ => ({..._, createdAt: "", updatedAt: ""}))
      },
    };
  }
);

export default Home;

interface HomePropTypes {
  newArrivals: Product[];
  bestSellers: Product[];
}
