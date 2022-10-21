import { ReactNode, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = ({
  hoverElement,
  children,
}: {
  hoverElement?: HTMLElement | null;
  children: ReactNode;
}) => {
  const [] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMountedClient, setIsMountedClient] = useState(false);

  useEffect(() => {
    setIsMountedClient(true);
  }, []);

  useEffect(() => {
    if (hoverElement) {
      const containerBounds = containerRef.current?.getBoundingClientRect();
      const hoverElementBounds = hoverElement.getBoundingClientRect();
      const containerWidth = containerBounds?.width || 0;
      const hoverElementX = hoverElementBounds.x;
      const hoverElementWidth = hoverElementBounds.width;
      const hoverElementY = hoverElementBounds.y;
      const hoverElementHeight = hoverElementBounds.height;

      if (containerRef.current) {
        containerRef.current.style.left =
          hoverElementX + hoverElementWidth / 2 - containerWidth / 2 + "px";
        containerRef.current.style.top =
          document.documentElement.scrollTop +
          hoverElementY +
          hoverElementHeight +
          "px";
      }
    }
  }, [hoverElement]);

  const PopupBody = (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={containerRef}
      className={"popup" + (hoverElement ? " popup--visible" : "")}
    >
      {children}
    </div>
  );

  if (isMountedClient) {
    return ReactDOM.createPortal(
      PopupBody,
      document.getElementById("popup-root") as HTMLElement
    );
  }
  return null;
};

export default Popup;
