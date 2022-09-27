import type { NextPage, GetServerSideProps } from "next";
// import { useEffect } from 'react';

import { withSessionSsr } from "@Lib/withSession";
// import prisma from '@Lib/prisma';

import SEO from "@Components/common/SEO";
import HeroBanner from "@Components/home/HeroBanner";
import CollectionSection from "@Components/home/CollectionSection";
import ProductsSection from "@Components/home/ProductsSection";
import GenderSection from "@Components/home/GenderSection";
import FeaturesSection from "@Components/home/FeaturesSection";

const Home: NextPage = (props) => {
  return (
    <>
      <SEO />

      <HeroBanner />
      <CollectionSection />
      <ProductsSection title="new arrivals" />
      <GenderSection />
      <ProductsSection title="best sellers" />
      <FeaturesSection />
    </>
  );
};

// use SSG for loading all & SSR to view individual
export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function ({ params, req }) {
    // const user = req.session.user;
    // const results = await prisma.user.findMany();

    return {
      props: {
        // users: results.map(_ => ({..._, createdAt: "", updatedAt: ""}))
      },
    };
  }
);

export default Home;
