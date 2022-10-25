import Image from "next/image";
import Img from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdArrowBackIosNew,
} from "react-icons/md";

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

import { useState } from "react";
const probe = require('probe-image-size');

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});

export default function ProductPage({
  product,
  relatedProducts,
  size
}: {
  product: ProductType;
  relatedProducts: ProductType[];
  size: { width: number, height: number };
}) {
  const { id, title, gender, ratings, price, discount } = product;

  const { addToCart } = useAuthState();
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <SEO title={product.title} />
      <div className="product-page__wrapper">
        <BreadCrumbs />
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
                  style={{width: "100%", height: "100%", position: "static"}}
                  src={product.mediaURLs[0]}
                  width={size.width}
                  height={size.height}
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
                options={[...Array(37)]
                  .map((_, i) => String(2 + i / 2))
                  .reduce((obj: any, val: string) => {
                    obj[val] = val;
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
              <li className="active">
                <button>Details</button>
              </li>
              <li>
                <button>Size Guide</button>
              </li>
              <li>
                <button>Reviews</button>
              </li>
            </ul>
          </div>
          <div className="product-view__details-body">
            {/* Lazy Load Components */}
            <div className="product-view__details-panel product-view__description-panel"></div>
            <div className="product-view__details-panel product-view__size-panel"></div>
            <div className="product-view__details-panel product-view__reviews-panel">
              <button>Write A Review</button> {/* MODAL */}
              <div className="review">
                {/*
								moment(time ago)
								Rating
								Name
								Avatar
								Body
							*/}
              </div>
            </div>
          </div>
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
        gender: product?.gender || Gender.MEN,
        type: product?.type || Category.MID,
        color: product?.color || "white",
      },
      take: 4,
    })
    .catch(console.log);

  let size = { width: 0, height: 0 }
  if (product) {
    size = await probe(product.mediaURLs[0]);
  }

  return {
    props: {
      product,
      relatedProducts,
      reviews: [],
      size
    },
  };
});
