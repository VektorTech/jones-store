import Image from "next/image";
import Img from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShare } from "react-icons/hi";

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

import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import Modal from "@Components/Modal";
import { getPathString, listToEnum } from "@Lib/utils";
import Carousel from "@Components/Carousel";
import RadioList from "@Components/common/formControls/RadioList";

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
    sizes: sizesOptions,
  } = product;

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
        <Reviews productId={product.id} />
      </Suspense>
    ),
  };

  const router = useRouter();

  const [shareModalOpen, setShareModalOpen] = useState(false);
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
            <div className="product-view__images">
              <ul>
                {product.mediaURLs.map((url, i) => (
                  <li key={url}>
                    <button
                      className={
                        i == activeImage ? "product-view__thumb-active" : ""
                      }
                      onClick={() => setActiveImage(i)}
                    >
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
                <Carousel
                  onUpdate={(i: number) => setActiveImage(i)}
                  aIndex={activeImage}
                  key={product.id + "carousel"}
                >
                  {product.mediaURLs.map((url, i) => (
                    <Img
                      key={"image:" + url}
                      style={{
                        objectPosition: "top",
                        objectFit: "contain",
                        height: "100%",
                        position: "static",
                      }}
                      src={url}
                      width={sizes[i].width}
                      height={sizes[i].height}
                      alt=""
                    />
                  ))}
                </Carousel>
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

          <div className="product-view__details">
            <p className="product-view__sku">SKU: {sku.toUpperCase()}</p>
            <p className="product-view__sku">Release Year: {year}</p>
            <p className="product-view__sku">Colorway: {color}</p>
          </div>

          <p className="product-view__price">
            {currencyFormatter.format(cartPrice)} <span>{percentageOff}</span>
          </p>

          <p className="product-view__sold">
            {salesCount || 0} Sold &mdash; {stockQty} available in stock
          </p>

          <form method="POST" action="/api/cart">
            <div className="product-view__size-selector">
              <RadioList
                name="sizes"
                label="Size: Please Select"
                grid
                values={allSizes}
                checkedItems={[checkedSize]}
                onChecked={(value) => setCheckedSize(value as string)}
                render={({ label, checked }) => (
                  <span
                    className={
                      "filter__param-box" +
                      (checked ? " filter__param-box--checked" : "")
                    }
                  >
                    {label}
                  </span>
                )}
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
              <input
                readOnly
                name="qty"
                key={quantity}
                defaultValue={quantity}
              />
              <button
                onClick={() => setQuantity(Math.min(quantity + 1, stockQty))}
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
                addToCart(id, quantity, Number(checkedSize));
              }}
              className="product-view__add-cart"
            >
              Add To Cart
            </Button>
          </form>
          <Button>Buy Now</Button>

          <button
            className="product-view__share-button"
            onClick={() => setShareModalOpen(true)}
          >
            <HiOutlineShare />
          </button>
          <Modal
            title="Share"
            visible={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
          >
            <div>
              <FacebookShareButton
                url={typeof location != "undefined" ? location.href : ""}
                quote={product.details}
                hashtag={"#jordanones"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <PinterestShareButton
                url={typeof location != "undefined" ? location.href : ""}
                media={product.mediaURLs[0]}
                description={product.details}
              >
                <PinterestIcon size={32} round />
              </PinterestShareButton>

              <TwitterShareButton
                url={typeof location != "undefined" ? location.href : ""}
                title={product.details}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <WhatsappShareButton
                url={typeof location != "undefined" ? location.href : ""}
                title={product.title}
                separator=":: "
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>

              <EmailShareButton
                url={typeof location != "undefined" ? location.href : ""}
                subject={product.title}
                body={product.details}
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </Modal>
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

      {relatedProducts.length ? (
        <div className="related-products">
          <h2 className="related-products__heading">Related Products</h2>

          <div className="related-products__list">
            {relatedProducts.map((product) => (
              <Product key={product.id} {...product} />
            ))}
          </div>
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
    ratings: true,
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

  const relatedProducts = await prisma.product.findMany({
    select,
    where: {
      id: { not: product?.id },
      gender: product?.gender,
      type: product?.type,
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
