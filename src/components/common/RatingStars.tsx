import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

export default function RatingStars({ count = 0 }) {
  return (
    <>
      {[...Array(5)].map((empty, i) => {
        let key = `${count}:${i}`;
        empty = <BsStar className="star" key={key} />;
        if (count - i >= 1) {
          empty = <BsStarFill className="star" key={key} />;
        } else if (count - i >= 0.5) {
          empty = <BsStarHalf className="star" key={key} />;
        }
        return empty;
      })}
    </>
  );
}
