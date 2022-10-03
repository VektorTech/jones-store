import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";

export default function Announcement({
  announcementState,
}: {
  announcementState?: boolean;
}) {
  const [hidden, setHidden] = useState(announcementState);

  const handleClose = () => {
    setHidden(true);
    document.cookie =
      "announcementState" +
      "=" +
      "closed" +
      "; expires=" +
      (Date.now() + 14 * 1000 * 60 * 60 * 24) +
      "; path=/";
  };

  return (
    <div className={`announcement${hidden ? " announcement--hidden" : ""}`}>
      <div className="announcement__container">
        <div className="announcement__content">
          OFFER:{" "}
          <a href="" className="announcement__link">
            Free Shipping Until January 1st!
            <FiHelpCircle className="announcement__info-icon" />
          </a>
        </div>
        <button onClick={handleClose} className="announcement__close">
          <BsXLg className="announcement__close-icon" />
        </button>
      </div>
    </div>
  );
}
