import type { NextPage, GetServerSideProps } from "next";
// import { useEffect } from 'react';

import { withSessionSsr } from "@Lib/withSession";
// import prisma from '@Lib/prisma';

import SEO from "@Components/common/SEO";
import HeroBanner from "@Components/Home/HeroBanner";
import CollectionSection from "@Components/Home/CollectionSection";
import ProductsSection from "@Components/Home/ProductsSection";
import GenderSection from "@Components/Home/GenderSection";
import FeaturesSection from "@Components/Home/FeaturesSection";

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
