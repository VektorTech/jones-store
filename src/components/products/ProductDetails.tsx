import { Product } from "@prisma/client";
import { useState, Suspense } from "react";
import { BarLoader } from "react-spinners";
import { CSSProperties } from "react";
import dynamic from "next/dynamic";

const SizeGuide = dynamic(() => import("@Components/SizeGuide"), {
	suspense: true,
  });

  const Reviews = dynamic(() => import("@Components/reviews"), {
	suspense: true,
  });


export default function ProductDetails({ product }: { product: Product }) {
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

  return (
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
            <button onClick={() => setTabName("size_guide")}>Size Guide</button>
          </li>
          <li
            className={
              "product-view__details-tab" +
              (tabName == "reviews" ? " product-view__details-tab--active" : "")
            }
          >
            <button onClick={() => setTabName("reviews")}>Reviews</button>
          </li>
        </ul>
      </div>
      <div className="product-view__details-body">{tabs[tabName]}</div>
    </div>
  );
}

const override: CSSProperties = {
  margin: "2rem auto 0 auto",
};
