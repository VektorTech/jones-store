import Link from "next/link";
import { useState, useEffect } from "react";
import { User, Review as ReviewType } from "@prisma/client";

import Button from "../formControls/Button";
import TextField from "../formControls/TextField";
import Form from "../common/Form";
import RatingStars from "../common/RatingStars";
import Modal from "../Modal";
import Review from "./Review";

import { useAuthState } from "@Lib/contexts/AuthContext";

export default function Reviews({ productId }: PropTypes) {
  const [reviewModal, setReviewModal] = useState(false);
  const [reviews, setReviews] = useState<(ReviewType & { user: User })[]>([]);

  const { user } = useAuthState();

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/products/${productId}/review`, { signal: controller.signal })
      .then((res) => {
        const respJson = res.json();
        if (res.ok) {
          return respJson;
        }
        return Promise.reject(respJson);
      })
      .then((res) => setReviews(res.data ?? []))
      .catch(console.log);

    return controller.abort.bind(controller);
  }, [productId]);

  const averageRatings =
    reviews.reduce((total, { rating }) => total + rating, 0) /
    (reviews.length || 1);

  return (
    <div className="product-details__panel product-details__reviews-panel">
      {user?.isAuth ? (
        <>
          <Button onClick={() => setReviewModal(true)}>Write A Review</Button>{" "}
          <Modal
            title="Write Review"
            visible={reviewModal}
            onClose={() => setReviewModal(false)}
          >
            <div className="product-details__reviews-form">
              <Form
                method="POST"
                action={`/api/products/${productId}/review`}
                afterSubmit={(data) => {
                  location.reload();
                }}
              >
                <RatingStars interactive />
                <TextField name="body" multiline label="Your review" />
                <Button>Submit Review</Button>
              </Form>
            </div>
          </Modal>{" "}
        </>
      ) : (
        <p className="product-details__prompt">
          Please{" "}
          <Link href="/login">
            <a className="product-details__link">login</a>
          </Link>{" "}
          to submit a review.
        </p>
      )}
      <div className="reviews">
        <div className="reviews__avg-ratings">
          Average Rating: <RatingStars count={averageRatings} />{" "}
          {averageRatings.toFixed(1)} ({reviews.length} Customer Reviews)
        </div>
        <ul className="reviews__list">
          {reviews.map((review) => (
            <li
              key={review.userId + review.productId}
              className="reviews__item"
            >
              <Review {...review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface PropTypes {
  productId: string;
}
