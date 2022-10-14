import Image from "next/image";

import { AiOutlineHeart } from "react-icons/ai";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import BreadCrumbs from "@Components/productList/BreadCrumbs";
import { withSessionSsr } from "@Lib/withSession";
import prisma from "@Lib/prisma";
import SEO from "@Components/common/SEO";
import RatingStars from "@Components/common/RatingStars";
import Product from "@Components/common/Product";
import { Gender, Product as ProductType, Category } from "@prisma/client";

export default function ProductPage({ product, relatedProducts }: { product: ProductType, relatedProducts: ProductType[] }) {
  const {
    id,
    title,
    gender,
    ratings,
    price,
    discount
  } = product;

  return (
    <>
      <SEO title={product.title} />
      <BreadCrumbs />

      <div className="product-view">
        <div className="product-view__gallery">
          {" "}
          {/* TODO: Should be own gallery component */}
          <div className="product-view__images">
            <ul>
              <li>
                <button>{/* <Image src="" width={80} height={60} /> */}</button>
              </li>
            </ul>
          </div>
          <div className="product-view__picture">
            <div className="product-view__picture-container">
              <div className="product-view__gallery-controls">
                <button className="gallery__prev">
                  <MdArrowBackIos />
                </button>
                <button className="gallery__next">
                  <MdArrowForwardIos />
                </button>
              </div>
              {/* <Image src="" /> */}
            </div>
            <button className="product-view__wishlist">
              <AiOutlineHeart />
            </button>
          </div>
        </div>

        <div className="product-view__cart">
          <h1 className="product-view__name">{title}</h1>
          <p className="product-view__gender">{gender}</p>
          <div className="product-view__ratings">
            <RatingStars count={ratings || 0} />
          </div>
          <p className="product-view__price">{price - (discount || 0)}</p>

          <form method="POST" action="/api/cart">
            <div className="product-view__size-selector">
              <input type="text" name="size" defaultValue="10" />
            </div>
            <div className="product-view__amount">
              <button> - </button>
              <input type="number" name="qty" id="" defaultValue={"3"} />
              <button> + </button>
            </div>
            <input type="hidden" name="productId" defaultValue={id} />
            <button type="submit" className="product-view__add-cart">Add To Cart</button>
          </form>
          {/* Share Icons */}
        </div>

        <div className="product-view__details">
          <div className="product-view__details-tabs">
            <ul>
              <li>
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
            <div className="product-view__details-panel"></div>
            <div className="product-view__size-panel"></div>
            <div className="product-view__reviews-panel">
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
          {
            relatedProducts.map(product => <Product key={product.id} {...product} />)
          }
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
      where: { sku: {
        equals: sku,
        mode: "insensitive"
      } },
    })
    .then(products => products[0])
    .catch(console.log);

  const relatedProducts = await prisma.product
    .findMany({
      select,
      where: {
        id: { not: product?.id },
        gender: (product?.gender || Gender.MEN),
        type: (product?.type || Category.MID),
        color: (product?.color || "white")
      },
      take: 4
    })
    .catch(console.log);

  return {
    props: {
      product,
      relatedProducts,
      reviews: [],
    },
  };
});
