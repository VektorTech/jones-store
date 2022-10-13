import Image from "next/image";

import { AiOutlineHeart } from "react-icons/ai";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import BreadCrumbs from "@Components/productList/BreadCrumbs";
import { withSessionSsr } from "@Lib/withSession";
import { Gender, Product } from "@prisma/client";
import prisma from "@Lib/prisma";
import SEO from "@Components/common/SEO";

export default function Product({ product }: { product: Product }) {
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
          <form action="">
            <h1 className="product-view__name"></h1>
            <p className="product-view__gender"></p>
            <div className="product-view__ratings"></div>
            <p className="product-view__price"></p>

            <div className="product-view__size-selector"></div>
            <div className="product-view__amount">
              <button> - </button>
              <span> 0 </span>
              <button> + </button>
            </div>
            <button className="product-view__add-cart">Add To Cart</button>
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

        <div className="related-products__list"></div>
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

  const results = await prisma.product
    .findUnique({
      where: { id: productId },
    })
    .catch(console.log);

  return {
    props: {
      products: results,
      reviews: [],
    },
  };
});
