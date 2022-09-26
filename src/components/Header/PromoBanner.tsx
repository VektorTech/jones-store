import { BsXLg } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";

export default function PromoBanner() {
  return (
    <div className="promo-banner">
      <div className="promo-banner__container">
        <div className="promo-banner__content">
          OFFER:{" "}
          <a href="" className="promo-banner__link">
            Free Shipping Until January 1st!
            <FiHelpCircle />
          </a>
        </div>
        <button className="promo-banner__close">
          <BsXLg />
        </button>
      </div>
    </div>
  );
}