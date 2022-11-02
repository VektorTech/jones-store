import { Review as ReviewType, User } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import RatingStars from "./common/RatingStars";

import UserAvatar from "@Images/user-avatar.jpg";

export default function Review({ user, addedAt, comment, rating }: ReviewType & { user: User }) {
  return (
    <div className="review">
      <div className="review__container">
        <div className="review__user-avatar">
          <Image
            className="review__user-avatar-element"
            src={user.avatarURL || UserAvatar}
            objectFit={"cover"}
            layout="fill"
            alt=""
          />
        </div>

        <div className="review__body">
          <div className="review__head">
            <div className="review__user">
              <span className="review__username">{user.username}</span>
              <span
                className="review__date"
                title={moment(addedAt).format("MMMM Do YYYY")}
              >
                {" "} &mdash; {moment(addedAt).fromNow()}
              </span>
            </div>

            <div className="review__ratings">
              <RatingStars count={rating} />
            </div>
          </div>
          <div className="review__comment">{comment}</div>
        </div>
      </div>
    </div>
  );
}
