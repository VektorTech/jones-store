import type { NextPage, GetServerSideProps } from "next";
import type { ProductComponentType } from "src/types/shared";

import CollectionSection from "@Components/home/CollectionSection";
import ProductsSection from "@Components/home/ProductsSection";
import GenderSection from "@Components/home/GenderSection";

import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";
import { aggregate, getBase64UrlCloudinary } from "src/helpers";

const Home: NextPage<HomePropTypes> = ({
  newArrivals,
  bestSellers,
  newArrivalsImgDataUrls,
  bestSellersImgDataUrls,
}) => {
  return (
    <>
      <CollectionSection />
      <ProductsSection
        productImageDataUrls={newArrivalsImgDataUrls}
        products={newArrivals}
        title="new arrivals"
        url="/category/new"
      />
      <GenderSection />
      <ProductsSection
        productImageDataUrls={bestSellersImgDataUrls}
        products={bestSellers}
        title="best sellers"
        url="/category/new?sort=best"
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

    const PRODUCTS_COUNT = 5;

    const newArrivals = await Promise.all(
        (
          await prisma.product.findMany({
            take: PRODUCTS_COUNT,
            select: { ...productColumns, review: { select: { rating: true } } },
            orderBy: { dateAdded: "desc" },
          })
        ).map(async (product) => ({
          ...product,
          ratings: aggregate(product.review),
        }))
      ),
      bestSellers = await Promise.all(
        (
          await prisma.product.findMany({
            take: PRODUCTS_COUNT,
            select: { ...productColumns, review: { select: { rating: true } } },
            orderBy: { salesCount: "desc" },
          })
        ).map(async (product) => ({
          ...product,
          ratings: aggregate(product.review),
        }))
      );

    const newArrivalsImgDataUrls: Record<string, string> = {};
    const bestSellersImgDataUrls: Record<string, string> = {};

    for await (const _product of newArrivals) {
      const newArrivalsImageUrl = _product.mediaURLs[0];
      const newArrivalsImageId =
        newArrivalsImageUrl.match(/upload\/(.+)/)?.[1] ?? "";

      newArrivalsImgDataUrls[_product.id] = await getBase64UrlCloudinary(
        newArrivalsImageId
      );
    }

    for await (const _product of bestSellers) {
      const bestSellersImageUrl = _product.mediaURLs[0];
      const bestSellersImageId =
        bestSellersImageUrl.match(/upload\/(.+)/)?.[1] ?? "";

      bestSellersImgDataUrls[_product.id] = await getBase64UrlCloudinary(
        bestSellersImageId
      );
    }

    return {
      props: {
        newArrivals,
        bestSellers,
        newArrivalsImgDataUrls,
        bestSellersImgDataUrls,
      },
    };
  }
);

export default Home;

interface HomePropTypes {
  newArrivals: ProductComponentType[];
  bestSellers: ProductComponentType[];
  newArrivalsImgDataUrls: Record<string, string>;
  bestSellersImgDataUrls: Record<string, string>;
}
