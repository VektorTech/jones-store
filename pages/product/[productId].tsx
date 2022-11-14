import Image from "next/image";
import Img from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";

import BreadCrumbs from "@Components/products/BreadCrumbs";
import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";
import SEO from "@Components/common/SEO";
import RatingStars from "@Components/common/RatingStars";
import Product from "@Components/common/Product";
import {
  Gender,
  Product as ProductType,
  Category,
  PaymentType,
} from "@prisma/client";
import { useAuthState } from "@Lib/contexts/AuthContext";
import Dropdown from "@Components/common/formControls/Dropdown";
import Button from "@Components/common/formControls/Button";

import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
const probe = require("probe-image-size");
import BarLoader from "react-spinners/BarLoader";
import { useRouter } from "next/router";

import { getPathString, listToEnum } from "@Lib/utils";
import Carousel from "@Components/Carousel";
import RadioList from "@Components/common/formControls/RadioList";
import ProductsGrid from "@Components/products/ProductsGrid";
import ShareButton from "@Components/common/ShareButton";
import ProductGallery from "@Components/products/ProductGallery";
import ProductCartForm from "@Components/products/ProductCartForm";
import ProductDetails from "@Components/products/ProductDetails";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

export default function ProductPage({
  product,
  relatedProducts,
  sizes,
}: {
  product: ProductType;
  relatedProducts: ProductType[];
  sizes: { width: number; height: number }[];
}) {
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
    shippingCost,
    sizes: sizesOptions,
  } = product;

  const { addToCart } = useAuthState();
  const [quantity, setQuantity] = useState(1);

  const router = useRouter();

  const [activeImage, setActiveImage] = useState(0);
  const [checkedSize, setCheckedSize] = useState<string>("");

  const allSizes = listToEnum(sizesOptions);
  const cartPrice = (price - (discount || 0)) * quantity;
  const percentageOff = discount
    ? `${Math.floor((discount / price) * 100)}% off`
    : "";

  return (
    <>
      <SEO title={product.title} />
      <div className="product-page__wrapper">
        <BreadCrumbs />
      </div>

      <div className="product-view">
        <ProductGallery images={product.mediaURLs} dimensions={sizes} />

        <div className="product-view__cart">
          <h1 className="product-view__name">{title}</h1>
          <p className="product-view__gender">{gender}</p>

          <div className="product-view__details">
            <p className="product-view__sku">SKU: {sku.toUpperCase()}</p>
            <p className="product-view__sku">Release Year: {year}</p>
            <p className="product-view__sku">Colorway: {color}</p>
          </div>

          <p className="product-view__price">
            {currencyFormatter.format(cartPrice)} <span>{percentageOff}</span>
          </p>

          <p className="product-view__price">
            <FiPackage /> { shippingCost ? `Shipping: ${currencyFormatter.format(shippingCost)}` : "Free Shipping" }
          </p>

          <p className="product-view__sold">
            {salesCount || 0} Sold &mdash; {stockQty} available in stock
          </p>

          <ProductCartForm product={product} />

          <Button
            onClick={(e) => {
              fetch("/api/checkout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  items: [
                    {
                      id: product.id,
                      qty: quantity,
                      size: checkedSize,
                    },
                  ],
                  provider: PaymentType.STRIPE,
                }),
              })
                .then((res) => {
                  const resBody = res.json();
                  if (res.ok) {
                    return resBody;
                  }
                  return Promise.reject(resBody);
                })
                .then(({ data }) => {
                  location.href = data;
                })
                .catch((err) => console.error(err.error));
            }}
          >
            Buy Now
          </Button>

          <ShareButton
            title={product.title}
            description={product.details}
            image={product.mediaURLs[0]}
            hashtags="#jonesstore"
          />
        </div>

        <ProductDetails product={product} />
      </div>

      {relatedProducts.length ? (
        <div className="related-products">
          <h2 className="related-products__heading">Related Products</h2>
          <ProductsGrid products={relatedProducts} />
        </div>
      ) : null}
    </>
  );
}

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

  const ratings = await prisma.review.aggregate({
    where: { productId: product?.id },
    _avg: { rating: true },
  });

  const relatedProducts = await prisma.product.findMany({
    select,
    where: {
      id: { not: product?.id },
      gender: product?.gender,
      color: product?.color,
    },
    take: 4,
  });

  let sizes: { width: number; height: number }[] = [];
  if (product) {
    sizes = await Promise.all(
      product.mediaURLs.map(async (url) => await probe(url))
    );
  }

  return {
    props: {
      product,
      relatedProducts,
      sizes,
    },
  };
};
