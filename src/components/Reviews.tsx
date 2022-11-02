import { User, Review as ReviewType } from "@prisma/client";
import { useState, useEffect } from "react";
import Button from "./common/formControls/Button";
import TextField from "./common/formControls/TextField";
import Form from "./Form";
import Modal from "./Modal";
import RatingStars from "./common/RatingStars";
import Review from "./Review";

export default function Reviews({ productId }: { productId: string }) {
  const [reviewModal, setReviewModal] = useState(false);
  const [reviews, setReviews] = useState<(ReviewType & { user: User })[]>([]);

  useEffect(() => {
    fetch(`/api/products/${productId}/review`)
      .then((res) => res.json())
      .then((res) => setReviews(res.data));
  }, [productId]);

  const averageRatings =
    reviews.reduce((total, { rating }) => total + rating, 0) /
    (reviews.length || 1);

  return (
    <div className="product-view__details-panel product-view__reviews-panel">
      <button onClick={() => setReviewModal(true)}>Write A Review</button>{" "}
      <Modal
        title="Write Review"
        visible={reviewModal}
        onClose={() => setReviewModal(false)}
      >
        <div>
          <Form
            method="POST"
            action={`/api/products/${productId}/review`}
            afterSubmit={(data, status) => {
              console.log(data, status);
            }}
          >
            <RatingStars interactive />
            <TextField name="body" multiline label="Your review" />
            <Button>Submit Review</Button>
          </Form>
        </div>
      </Modal>
      <div className="reviews">
        <div className="reviews__avg-ratings">
          Average Rating: <RatingStars count={averageRatings} /> {averageRatings.toFixed(1)} (
          {reviews.length} Customer Reviews)
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
