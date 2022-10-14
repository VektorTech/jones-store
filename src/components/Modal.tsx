import useTabTrapIn from "@Lib/hooks/useTabTrapIn";
import React, { ReactElement, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { VscChromeClose } from "react-icons/vsc";

export default function Modal({
  children,
  title = "",
  onClose,
  visible = true,
}: {
  children: ReactElement;
  title?: string;
  onClose?: () => void;
  visible?: boolean;
}) {
  const [isMountedClient, setIsMountedClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useTabTrapIn(modalRef.current, visible);

  useEffect(() => {
    setIsMountedClient(true);
  }, []);

  const ModalBody = visible ? (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div ref={modalRef} className="modal__main">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button onClick={onClose} className="modal__close">
            <VscChromeClose />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  ) : null;

  if (isMountedClient) {
    return ReactDOM.createPortal(
      ModalBody,
      document.getElementById("modal-root") as HTMLElement
    );
  }

  return null;
}
