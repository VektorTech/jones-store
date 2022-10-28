import Image from "next/image";
import Img from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

import BreadCrumbs from "@Components/productList/BreadCrumbs";
import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";
import SEO from "@Components/common/SEO";
import RatingStars from "@Components/common/RatingStars";
import Product from "@Components/common/Product";
import { Gender, Product as ProductType, Category } from "@prisma/client";
import { useAuthState } from "@Lib/contexts/AuthContext";
import Dropdown from "@Components/common/formControls/Dropdown";
import Button from "@Components/common/formControls/Button";

import dynamic from "next/dynamic";
import { useState, Suspense } from "react";
const probe = require("probe-image-size");
import BarLoader from "react-spinners/BarLoader";
import { CSSProperties } from "react";
import { useRouter } from "next/router";

const override: CSSProperties = {
  margin: "2rem auto 0 auto",
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

const SizeGuide = dynamic(() => import("@Components/SizeGuide"), {
  suspense: true,
});

const Reviews = dynamic(() => import("@Components/Reviews"), {
  suspense: true,
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
  const { id, title, gender, ratings, price, discount } = product;

  const { addToCart } = useAuthState();
  const [quantity, setQuantity] = useState(1);
  const [tabName, setTabName] = useState<
    "description" | "size_guide" | "reviews"
  >("description");

  const tabs: {
    description: JSX.Element;
    size_guide: JSX.Element;
    reviews: JSX.Element;
  } = {
    description: (
      <div className="product-view__details-panel product-view__description-panel">
        {product.details}
      </div>
    ),
    size_guide: (
      <Suspense
        fallback={<BarLoader speedMultiplier={2} cssOverride={override} />}
      >
        <SizeGuide />
      </Suspense>
    ),
    reviews: (
      <Suspense
        fallback={<BarLoader speedMultiplier={2} cssOverride={override} />}
      >
        <Reviews />
      </Suspense>
    ),
  };

  const router = useRouter();

  return (
    <>
      <SEO title={product.title} />
      <div className="product-page__wrapper">
        <BreadCrumbs
          items={[
            {
              url: "/category/" + product.gender.toLocaleLowerCase(),
              text: product.gender,
            },
            {
              url: router.asPath,
              text: product.title,
            },
          ]}
        />
      </div>

      <div className="product-view">
        <div className="product-view__gallery">
          <div className="product-view__gallery-container">
            {" "}
            {/* TODO: Should be own gallery component */}
            <div className="product-view__images">
              <ul>
                {product.mediaURLs.map((url) => (
                  <li key={url}>
                    <button>
                      <Image
                        objectFit="contain"
                        src={url}
                        width={80}
                        height={60}
                        layout="responsive"
                        alt=""
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="product-view__picture">
              <div className="product-view__picture-container">
                <Img
                  style={{ width: "100%", height: "100%", position: "static" }}
                  src={product.mediaURLs[0]}
                  width={sizes[0].width}
                  height={sizes[0].height}
                  alt=""
                />
                <div className="product-view__gallery-controls">
                  <button className="gallery__prev">
                    <MdArrowBackIosNew />
                  </button>
                  <button className="gallery__next">
                    <MdArrowForwardIos />
                  </button>
                </div>
              </div>
              <button className="product-view__wish">
                <AiOutlineHeart />
              </button>
            </div>
          </div>
        </div>

        <div className="product-view__cart">
          <h1 className="product-view__name">{title}</h1>
          <p className="product-view__gender">{gender}</p>
          <div className="product-view__ratings">
            <RatingStars count={ratings || 0} />
          </div>
          <p className="product-view__price">
            {currencyFormatter.format(price - (discount || 0))}
          </p>

          <form method="POST" action="/api/cart">
            <div className="product-view__size-selector">
              <Dropdown
                options={product.sizes.reduce((obj: any, val: number) => {
                  obj[val.toString()] = val.toString();
                  return obj;
                }, {})}
              />
            </div>
            <div className="product-view__quantity">
              <button
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                type="button"
              >
                {" "}
                -{" "}
              </button>
              <input name="qty" id="" key={quantity} defaultValue={quantity} />
              <button
                onClick={() => setQuantity(Math.min(quantity + 1, 10))}
                type="button"
              >
                {" "}
                +{" "}
              </button>
            </div>
            <input type="hidden" name="productId" defaultValue={id} />
            <Button
              onClick={(e) => {
                e.preventDefault();
                addToCart(id, 3, 10);
              }}
              className="product-view__add-cart"
            >
              Add To Cart
            </Button>
          </form>
          <Button>Buy Now</Button>
          {/* Share Icons */}
        </div>

        <div className="product-view__details">
          <div className="product-view__details-tabs">
            <ul>
              <li
                className={
                  "product-view__details-tab" +
                  (tabName == "description"
                    ? " product-view__details-tab--active"
                    : "")
                }
              >
                <button onClick={() => setTabName("description")}>
                  Description
                </button>
              </li>
              <li
                className={
                  "product-view__details-tab" +
                  (tabName == "size_guide"
                    ? " product-view__details-tab--active"
                    : "")
                }
              >
                <button onClick={() => setTabName("size_guide")}>
                  Size Guide
                </button>
              </li>
              <li
                className={
                  "product-view__details-tab" +
                  (tabName == "reviews"
                    ? " product-view__details-tab--active"
                    : "")
                }
              >
                <button onClick={() => setTabName("reviews")}>Reviews</button>
              </li>
            </ul>
          </div>
          <div className="product-view__details-body">{tabs[tabName]}</div>
        </div>
      </div>

      <div className="related-products">
        <h2 className="related-products__heading">Related Products</h2>

        <div className="related-products__list">
          {relatedProducts.map((product) => (
            <Product key={product.id} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(async function ({
  params,
  req,
  query,
}) {
  const productId = params?.productId as string;
  const sku = productId.substring(productId.length - 10).replace("-", " ");

  const select = {
    title: true,
    price: true,
    discount: true,
    mediaURLs: true,
    gender: true,
    ratings: true,
    details: true,
    color: true,
    year: true,
    stockQty: true,
    salesCount: true,
    shippingCost: true,
    sizes: true,
    type: true,
    // review: true,
    sku: true,
    id: true,
  };

  const product = await prisma.product
    .findMany({
      select,
      where: {
        sku: {
          equals: sku,
          mode: "insensitive",
        },
      },
    })
    .then((products) => products[0])
    .catch(console.log);

  const relatedProducts = await prisma.product
    .findMany({
      select,
      where: {
        id: { not: product?.id },
        gender: product?.gender,
        type: product?.type,
        color: product?.color,
      },
      take: 4,
    })
    .catch(console.log);

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
      reviews: [],
      sizes,
    },
  };
});
