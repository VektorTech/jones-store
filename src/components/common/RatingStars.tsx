import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useState, cloneElement } from "react";

export default function RatingStars({
  count = 0,
  interactive,
}: {
  count?: number;
  interactive?: boolean;
}) {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [ratingValue, setRatingValue] = useState(0);
  count = interactive ? hoverIndex : count;

  return (
    <>
      {[...Array(5)].map((empty, index) => {
        let key = `${count}:${index}`;
        empty = <BsStar className="star" key={key} />;
        if (count - index >= 1) {
          empty = <BsStarFill className="star" key={key} />;
        } else if (count - index >= 0.5) {
          empty = <BsStarHalf className="star" key={key} />;
        }
        if (interactive) {
          return cloneElement(empty, {
            onMouseOver: (e) => {
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
            className: "ratings__interactive",
          });
        }
        return empty;
      })}
      {interactive && <input type="hidden" name="rating" value={ratingValue} />}
    </>
  );
}
