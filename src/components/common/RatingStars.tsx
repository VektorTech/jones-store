import { useState, cloneElement, MouseEvent } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function RatingStars({ count = 0, interactive }: PropTypes) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  count = interactive ? hoverIndex : count;

  return (
    <div className="stars">
      <div className="stars__icons">
        {[...Array(5)].map((empty, index) => {
          let key = `${count}:${index}`;
          empty = <BsStar className="stars__star" key={key} />;
          if (count - index >= 1) {
            empty = <BsStarFill className="stars__star" key={key} />;
          } else if (count - index >= 0.5) {
            empty = <BsStarHalf className="stars__star" key={key} />;
          }
          if (interactive) {
            return cloneElement(empty, {
              onMouseOver: (e: MouseEvent) => {
                const left = e.currentTarget.getBoundingClientRect().x;
                const width = e.currentTarget.clientWidth;
                const mouseX = e.pageX;
                const value = mouseX < left + width / 2 ? 0.5 : 1;
                setHoverIndex(index + value);
              },
              onMouseOut: () => setHoverIndex(ratingValue),
              onClick: () => {
                if (interactive) {
                  setRatingValue(hoverIndex);
                }
              },
              className: "stars__interactive",
            });
          }
          return empty;
        })}
      </div>
      {interactive && <input type="hidden" name="rating" value={ratingValue} />}
    </div>
  );
}

interface PropTypes {
  count?: number;
  interactive?: boolean;
}
