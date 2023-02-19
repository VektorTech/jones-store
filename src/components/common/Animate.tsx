import { cloneElement, ReactElement, useState } from "react";
import useIsomorphicLayoutEffect from "@Hooks/useIsomorphicLayoutEffect";

export default function Animate({
  children,
  isMounted,
  unmountDelay,
}: PropTypes) {
  const [mounted, setMounted] = useState(isMounted);
  const [className, setClassName] = useState("");

  const Cloned = cloneElement(children, {
    className: `${children.props.className} ${className}`,
  });

  useIsomorphicLayoutEffect(() => {
    if (isMounted) {
      requestAnimationFrame(() => setClassName("active"));
      setMounted(isMounted);
    } else {
      setClassName("");
      setTimeout(() => setMounted(isMounted), unmountDelay);
    }
  }, [isMounted, unmountDelay]);

  return mounted ? Cloned : null;
}

interface PropTypes {
  children: ReactElement;
  isMounted: boolean;
  unmountDelay: number;
}
