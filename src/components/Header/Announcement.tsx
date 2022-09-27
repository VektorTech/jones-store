import { BsXLg } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";

export default function Announcement() {
  return (
    <div className="announcement">
      <div className="announcement__container">
        <div className="announcement__content">
          OFFER:{" "}
          <a href="" className="announcement__link">
            Free Shipping Until January 1st!
            <FiHelpCircle className="announcement__info-icon" />
          </a>
        </div>
        <button className="announcement__close">
          <BsXLg className="announcement__close-icon" />
        </button>
      </div>
    </div>
  );
}