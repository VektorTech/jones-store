import React, { ReactElement, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { VscChromeClose } from "react-icons/vsc";

import useTabTrapIn from "@Lib/hooks/useKeyTrap";

export default function Modal({
  children,
  title = "",
  onClose,
  size = "md",
  visible = true,
}: PropTypes) {
  const [isMountedClient, setIsMountedClient] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useTabTrapIn(modalRef.current, visible);

  useEffect(() => {
    setIsMountedClient(true);

    const modal = modalRef.current;

    if (!modal) return;

    const closeOnEscape = ({ key }: KeyboardEvent) => {
      if (key == "Escape" && onClose) onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () =>
      document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  const ModalBody = visible ? (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose}></div>
      <div ref={modalRef} className={"modal__main" + " modal__main--" + size}>
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

interface PropTypes {
  children: ReactElement;
  title?: string;
  onClose?: () => void;
  size?: "sm" | "md" | "lg";
  visible?: boolean;
}
