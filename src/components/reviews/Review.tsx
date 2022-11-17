import Image from "next/image";
import moment from "moment";
import { Review as ReviewType, User } from "@prisma/client";

import RatingStars from "../common/RatingStars";

import UserAvatar from "@Images/user-avatar.jpg";

export default function Review({ user, addedAt, comment, rating }: PropTypes) {
  return (
    <div className="review">
      <div className="review__container">
        <div className="review__user-avatar">
          <Image
            className="review__user-avatar-element"
            src={user.avatarURL ?? UserAvatar}
            objectFit={"cover"}
            layout="fill"
            alt=""
          />
        </div>

        <div className="review__body">
          <div className="review__head">
            <div className="review__user">
              <span className="review__username">{user.username}</span>
              <wbr />
              <time
                className="review__date"
                title={moment(addedAt).format("MMMM Do YYYY")}
              >
                {" "}
                &mdash; {moment(addedAt).fromNow()}
              </time>
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

type PropTypes = ReviewType & { user: User };
