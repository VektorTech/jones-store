import type { ProductComponentType } from "src/types/shared";

const probe = require("probe-image-size");

import SEO from "@Components/common/SEO";
import ProductsGrid from "@Components/products/ProductsGrid";
import ShareButton from "@Components/common/ShareButton";
import ProductGallery from "@Components/products/ProductGallery";
import ProductCartForm from "@Components/products/ProductCartForm";
import ProductDetails from "@Components/products/ProductDetails";

import prisma from "@Lib/prisma";
import { getPathString } from "@Lib/utils";
import { NextPage } from "next";
import { getProductRatings } from "@Lib/helpers";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

const ProductPage: NextPage<ProductPageType> = ({
  product,
  relatedProducts,
  imageDimensions,
}) => {
  const {
    id,
    title,
    gender,
    price,
    discount,
    sku,
    year,
    color,
    salesCount,
    stockQty,
  } = product;

  const cartPrice = (price - discount) * 1;
  const percentageOff = discount
    ? `${Math.floor((discount / price) * 100)}% off`
    : "";

  return (
    <>
      <SEO title={product.title} />

      <div className="product-view">
        <ProductGallery
          productId={id}
          images={product.mediaURLs}
          dimensions={imageDimensions}
        />

        <div className="product-view__cart">
          <h1 className="product-view__name">{title}</h1>
          <p className="product-view__gender">{gender}</p>

          <div className="product-view__details">
            <p className="product-view__details-info">
              SKU: {sku.toUpperCase()}
            </p>
            <p className="product-view__details-info">Release Year: {year}</p>
            <p className="product-view__details-info">Colorway: {color}</p>
          </div>

          <p className="product-view__price">
            {currencyFormatter.format(cartPrice)} <span>{percentageOff}</span>
          </p>

          <p className="product-view__sold">
            {salesCount ?? 0} Sold &mdash; {stockQty} available in stock
          </p>

          <ProductCartForm product={product} />

          <ShareButton
            title={product.title}
            description={product.details}
            image={product.mediaURLs[0]}
            hashtags="#jonesstore"
          />
        </div>

        <ProductDetails product={product} />
      </div>

      <div className="related-products">
        {relatedProducts.length ? (
          <>
            <h2 className="related-products__heading">Related Products</h2>
            <ProductsGrid products={relatedProducts} />
          </>
        ) : null}
      </div>
    </>
  );
};

export const getStaticPaths = async function () {
  const products = await prisma.product.findMany({
    select: { title: true, sku: true },
  });

  return {
    paths: products.map(({ title, sku }) => ({
      params: { productId: getPathString(title + " " + sku) },
    })),
    fallback: false,
  };
};

export const getStaticProps = async function ({
  params,
}: {
  params: { productId: string };
}) {
  const sku = params.productId
    .substring(params.productId.length - 10)
    .replace("-", " ");

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

  const product = await prisma.product.findFirst({
    select,
    where: { sku: { equals: sku, mode: "insensitive" } },
  });

  const ratings = product ? await getProductRatings(product.id) : 0;

  const relatedProducts = await Promise.all(
    (
      await prisma.product.findMany({
        select,
        where: {
          id: { not: product?.id },
          gender: product?.gender,
          color: product?.color,
        },
        take: 5,
      })
    ).map(async (product) => ({
      ...product,
      ratings: await getProductRatings(product.id),
    }))
  );

  let imageDimensions: { width: number; height: number }[] = [];

  if (product) {
    imageDimensions = await Promise.all(
      product.mediaURLs.map(async (url) => await probe(url))
    );
  }

  return {
    props: {
      product: { ...product, ratings },
      relatedProducts,
      imageDimensions,
    },
  };
};

export default ProductPage;

interface ProductPageType {
  product: ProductComponentType;
  relatedProducts: ProductComponentType[];
  imageDimensions: { width: number; height: number }[];
}
