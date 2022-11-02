import Router from "next/router";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

export default function Carousel({
  children,
  aIndex,
  onUpdate
}: {
  children: React.ReactNode;
  aIndex: number;
  onUpdate?: Function;
}) {
  const carousel = useRef<HTMLDivElement>(null);
  const slidesContainer = useRef<HTMLDivElement>(null);
  const transitioning = useRef<boolean>(false);
  const direction = useRef<"forward" | "backward" | "">("");

  const [slideNumber, setSlideNumber] = useState(aIndex);
  const [carouselWidth, setCarouselWidth] = useState(
    carousel.current?.offsetWidth || 0
  );

  const getChildrenAsSlides = () => {
    if (children instanceof Array) {
      let childrenUpdated = React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          className: (child.props.className || "") + " carousel__slide",
        });
      });

      return childrenUpdated;
    }
  };

  const updatedChildren = getChildrenAsSlides();
  const len = React.Children.count(updatedChildren);
  const before = updatedChildren?.[(slideNumber - 1 + len) % len];
  const between = updatedChildren?.[slideNumber];
  const after = updatedChildren?.[(slideNumber + 1) % len];

  const [renderComp, setRenderComp] = useState([before, between, after]);
  if (slidesContainer.current) {
    slidesContainer.current.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
  }

  useEffect(() => {
    const updateChildren = () => {
      const updatedChildren = getChildrenAsSlides();
      const len = React.Children.count(updatedChildren);
      const before = updatedChildren?.[(slideNumber - 1 + len) % len];
      const between = updatedChildren?.[slideNumber];
      const after = updatedChildren?.[(slideNumber + 1) % len];
      setRenderComp([before, between, after]);
    };
    Router.events.on("routeChangeComplete", updateChildren);
    return () => Router.events.off("routeChangeComplete", updateChildren);
  }, [children]);

  useEffect(() => {
    if (aIndex == slideNumber) { return; }

    const before = updatedChildren?.[(aIndex - 1 + len) % len];
    const between = updatedChildren?.[aIndex];
    const after = updatedChildren?.[(aIndex + 1) % len];
    setSlideNumber(aIndex);
    setRenderComp([before, between, after]);
  }, [aIndex]);

  useEffect(() => {
    onUpdate?.(slideNumber);
  }, [slideNumber]);

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(carousel.current.offsetWidth);
    }
    const handleResize = () => {
      direction.current = "";
      setCarouselWidth(carousel.current?.offsetWidth || 0);
    };
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, [carousel]);

  useEffect(() => {
    if (slidesContainer.current) {
      if (direction.current == "backward") {
        slidesContainer.current.style.transform = `translate3d(${0}px, 0, 0)`;
      } else if (direction.current == "forward") {
        slidesContainer.current.style.transform = `translate3d(${
          -carouselWidth * 2
        }px, 0, 0)`;
      }
    }
  }, [slideNumber, slidesContainer, carouselWidth]);

  useEffect(() => {
    const reset = () => {
      transitioning.current = false;
      if (slidesContainer.current) {
        const before = updatedChildren?.[(slideNumber - 1 + len) % len];
        const between = updatedChildren?.[slideNumber];
        const after = updatedChildren?.[(slideNumber + 1) % len];
        setRenderComp([before, between, after]);
      }
    };

    const sc = slidesContainer.current;
    sc?.addEventListener("transitionend", reset);

    return () => sc?.removeEventListener("transitionend", reset);
  }, [slideNumber, updatedChildren, len]);

  useLayoutEffect(() => {
    if (slidesContainer.current) {
      direction.current = "";
      slidesContainer.current.style.transition = "transform 0s";
      slidesContainer.current.style.transform = `translate3d(${-carouselWidth}px, 0, 0)`;
    }
  }, [renderComp, carouselWidth]);

  return (
    <>
      <div className="carousel" ref={carousel}>
        <div
          ref={slidesContainer}
          style={{ width: `${carouselWidth * 3}px` }}
          className="carousel__container"
        >
          {renderComp}
        </div>
      </div>
      <div className="product-view__gallery-controls">
        <button
          onClick={() => {
            if (!transitioning.current) {
              direction.current = "backward";
              transitioning.current = true;
              setSlideNumber((slideNumber - 1 + len) % len);
            }
          }}
          className="gallery__prev"
        >
          <MdArrowBackIosNew />
        </button>
        <button
          onClick={() => {
            if (!transitioning.current) {
              direction.current = "forward";
              transitioning.current = true;
              setSlideNumber((slideNumber + 1) % len);
            }
          }}
          className="gallery__next"
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
}
