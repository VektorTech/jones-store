import { useAnnouncementState } from "@Lib/contexts/UIContext";
import { setCookie } from "@Lib/utils";
import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";

export default function Announcement() {
  const announcementVisible = useAnnouncementState();
  const [hidden, setHidden] = useState(!announcementVisible);

  const handleClose = () => {
    setHidden(true);
    setCookie("announcementState", "closed", 14);
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
