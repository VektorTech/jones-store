import Modal from "@Components/Modal";
import { useAnnouncementState, useDialog } from "@Lib/contexts/UIContext";
import { setCookie } from "@Lib/utils";
import type { Announcement as AnnouncementType } from "@prisma/client";
import { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";

export default function Announcement() {
  const announcementVisible = useAnnouncementState();
  const [hidden, setHidden] = useState(!announcementVisible);
  const [content, setContent] = useState<AnnouncementType>();

  const { currentDialog, setDialog } = useDialog();
  const visible = currentDialog == "MODAL_POPUP";

  const handleClose = () => {
    setHidden(true);
    setCookie("announcementState", "closed", 14);
  };

  useEffect(() => {
    if (!hidden) {
      fetch("/api/announcement")
        .then(res => res.json())
        .then(({ data }: { data: AnnouncementType[] }) => {
          setContent(data[0]);
        })
        .catch(console.log);
    }
  }, [hidden]);

  return (
    <div className={`announcement${hidden ? " announcement--hidden" : ""}`}>
      <div className="announcement__container">
        <div onClickCapture={(e) => { e.preventDefault(); setDialog("MODAL_POPUP"); }} className="announcement__content">
          <span dangerouslySetInnerHTML={{ __html: content?.headline || "" }}></span>
          { content ? <FiHelpCircle className="announcement__info-icon" /> : "Loading..." }
        </div>
        <Modal onClose={() => setDialog(null)} visible={visible}>
          <div dangerouslySetInnerHTML={{ __html: content?.details || "" }}></div>
        </Modal>
        <button onClick={handleClose} className="announcement__close">
          <BsXLg className="announcement__close-icon" />
        </button>
      </div>
    </div>
  );
}
