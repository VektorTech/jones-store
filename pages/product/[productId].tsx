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
import RatingStars from "@Components/common/RatingStars";

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
    type,
    ratings,
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
          <RatingStars count={ratings} />

          <div className="product-view__details">
            <p className="product-view__details-info">
              <strong>Model No.:</strong> {sku.toUpperCase()}
            </p>
            <p className="product-view__details-info">
              <strong>Release Year:</strong> {year}
            </p>
            <p className="product-view__details-info">
              <strong>Upper:</strong> {type.toLocaleLowerCase()}  Cut
            </p>
            <p className="product-view__details-info">
              <strong>Colorway:</strong> {color}
            </p>
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

  const product = await prisma.product.findFirst({
    where: { sku: { equals: sku, mode: "insensitive" } },
  });

  const relatedProducts = await Promise.all(
    (
      await prisma.product.findMany({
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
      dateAdded: product.dateAdded.toJSON(),
    }))
  );

  let productFinal: ProductComponentType | null = null;

  let imageDimensions: { width: number; height: number }[] = [];

  if (product) {
    imageDimensions =
      (await Promise.all(
        product.mediaURLs.map(async (url) => await probe(url))
      ).catch(console.log)) ?? [];
    productFinal = {
      ...product,
      dateAdded: product.dateAdded.toJSON(),
      ratings: await getProductRatings(product.id),
    };
  }

  assertProductComponentType(productFinal);

  return {
    props: {
      product: productFinal,
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

function assertProductComponentType(
  product: (unknown & { dateAdded: unknown }) | null
): asserts product is ProductComponentType {
  if (
    !product ||
    !("dateAdded" in product && typeof product.dateAdded == "string") ||
    !("ratings" in product)
  ) {
    throw new TypeError("ProductComponentType Expected");
  }
}
