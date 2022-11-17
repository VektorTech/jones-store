import type { NextPage, GetServerSideProps } from "next";
import type { ProductComponentType } from "src/types/shared";

import CollectionSection from "@Components/home/CollectionSection";
import ProductsSection from "@Components/home/ProductsSection";
import GenderSection from "@Components/home/GenderSection";

import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";

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

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function () {
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
          ratings: await prisma.review
            .aggregate({
              where: { productId: p.id },
              _avg: { rating: true },
            })
            .then((r) => r._avg.rating),
        }))
      ),
      bestSellers = await Promise.all(
        (
          await prisma.product.findMany({
            take: 5,
            select: productColumns,
            orderBy: { salesCount: "desc" },
          })
        ).map(async (p) => ({
          ...p,
          ratings: await prisma.review
            .aggregate({
              where: { productId: p.id },
              _avg: { rating: true },
            })
            .then((r) => r._avg.rating),
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
