import { ReactNode, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Popup = ({
  hoverElementId,
  children,
  currentId
}: {
  hoverElementId: string;
  currentId?: string;
  children: ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMountedClient, setIsMountedClient] = useState(false);
  const active = hoverElementId == currentId;

  useEffect(() => {
    setIsMountedClient(true);
  }, []);

  useEffect(() => {
    const hoverElement = document.getElementById(hoverElementId);

    if (hoverElement && active) {
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
  }, [hoverElementId, active]);

  const PopupBody = (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={containerRef}
      className={"popup" + (active ? " popup--visible" : "")}
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
