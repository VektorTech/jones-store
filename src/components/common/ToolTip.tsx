import { ReactNode, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

function ToolTip({ hoverElementId, children, currentId }: PropTypes) {
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
      const containerWidth = containerBounds?.width ?? 0;
      const hoverElementX = hoverElementBounds.x;
      const hoverElementWidth = hoverElementBounds.width;
      const hoverElementY = hoverElementBounds.y;
      const hoverElementHeight = hoverElementBounds.height;

      if (containerRef.current) {
        const newLeft =
          hoverElementX + hoverElementWidth / 2 - containerWidth / 2;
        const bodyOverflowRight = Math.max(
          0,
          newLeft +
            containerRef.current.offsetWidth -
            document.documentElement.offsetWidth
        );

        containerRef.current.style.left = newLeft - bodyOverflowRight + "px";
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
      <div className="popup__container">{children}</div>
    </div>
  );

  if (isMountedClient) {
    return ReactDOM.createPortal(
      PopupBody,
      document.getElementById("popup-root") as HTMLElement
    );
  }
  return null;
}

export default ToolTip;

interface PropTypes {
  hoverElementId: string;
  currentId?: string;
  children: ReactNode;
}
