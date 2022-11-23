import { ReactElement, cloneElement, useRef } from "react";

import useIsomorphicLayoutEffect from "@Lib/hooks/useIsomorphicLayoutEffect";

export default function MotionElement({
  children,
}: {
  children: ReactElement;
}) {
  const motionChildRef = useRef<HTMLElement>(null);
  const motionChild = cloneElement(children, {
    className:
      "motion-element" +
      (children.props.className ? ` ${children.props.className}` : ""),
    ref: motionChildRef,
  });
  const recsSnapshot = useRef<Rect>();

  useIsomorphicLayoutEffect(() => {
    const child = motionChildRef.current;

    if (!child) return;

    let boundingRect: Rect = {
      left: child.offsetLeft,
      top: child.offsetTop,
      width: child.offsetWidth,
      height: child.offsetHeight,
    };

    const resizeObserver = new ResizeObserver(() => {
      boundingRect = {
        left: child.offsetLeft,
        top: child.offsetTop,
        width: child.offsetWidth,
        height: child.offsetHeight,
      };
    });
    resizeObserver.observe(child);

    if (recsSnapshot.current) {
      const offsetX = boundingRect.left - recsSnapshot.current.left;
      const offsetY = boundingRect.top - recsSnapshot.current.top;
      const scaleFactorX = recsSnapshot.current.width / boundingRect.width;
      const scaleFactorY = recsSnapshot.current.height / boundingRect.height;

      child.style.transition = `transform 0s`;
      child.style.transform =
        `translate3d(${-offsetX}px, ${-offsetY}px, 0px) ` +
        `scale(${scaleFactorX}, ${scaleFactorY})`;

      requestAnimationFrame(() => {
        child.style.transition = `transform 0.35s ease-out`;
        child.style.transform = `translate3d(0px, 0px, 0px) scale(1, 1)`;
      });
    }

    return () => {
      recsSnapshot.current = boundingRect;
      resizeObserver.disconnect();
    };
  });

  return motionChild;
}

interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}
