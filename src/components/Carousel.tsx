import React, { useState, useRef, useEffect } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import useMouseCoords from "@Hooks/useMouseCoords";

export default function Carousel({ children, aIndex, onUpdate }: PropTypes) {
  const carousel = useRef<HTMLDivElement>(null);
  const slidesContainer = useRef<HTMLDivElement>(null);
  const transitioning = useRef<boolean>(false);
  const [slideNumber, setSlideNumber] = useState(aIndex);
  const [carouselWidth, setCarouselWidth] = useState(
    carousel.current?.clientWidth ?? 0
  );
  const [x, y] = useMouseCoords(carousel.current, 0, 35);

  const getChildrenAsSlides = (): Array<React.ReactNode> | undefined => {
    if (Array.isArray(children)) {
      return React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          className:
            (child.props.className ?? "") +
            " carousel__slide" +
            (slideNumber == index ? " carousel__slide--active" : ""),
          width: carouselWidth,
        });
      });
    }
  };
  const updatedChildren = getChildrenAsSlides();
  const len = React.Children.count(updatedChildren);

  useEffect(() => {
    setSlideNumber(aIndex);
  }, [aIndex]);

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(carousel.current.clientWidth);
    }
    const handleResize = () => {
      setCarouselWidth(carousel.current?.clientWidth ?? 0);
    };
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, [carousel]);

  useEffect(() => {
    if (slidesContainer.current) {
      const shiftAmount = carouselWidth * slideNumber;
      slidesContainer.current.style.transform = `translate3d(-${shiftAmount}px, 0, 0)`;
    }
  }, [slideNumber, slidesContainer, carouselWidth]);

  useEffect(() => {
    const reset = () => (transitioning.current = false);

    const sc = slidesContainer.current;
    sc?.addEventListener("transitionend", reset);

    return () => sc?.removeEventListener("transitionend", reset);
  }, [slideNumber, updatedChildren, len]);

  const handlePointerOver: React.PointerEventHandler<HTMLDivElement> = () => {
    const activeSlide = slidesContainer.current?.querySelector(
      ".carousel__slide--active"
    );
    if (activeSlide instanceof HTMLElement) {
      activeSlide.style.transform = `scale(3) translate3d(${-x}px, ${-y}px, 0)`;
    }
  };

  const handlePointerLeave = () => {
    const activeSlide = slidesContainer.current?.querySelector(
      ".carousel__slide--active"
    );
    if (activeSlide instanceof HTMLElement) {
      activeSlide.style.transform = `scale(1) translate3d(0, 0, 0)`;
    }
  };

  return (
    <div
      className="carousel"
      ref={carousel}
      onPointerMove={handlePointerOver}
      onPointerOut={handlePointerLeave}
    >
      <div
        ref={slidesContainer}
        style={{ width: `${carouselWidth * len}px` }}
        className="carousel__container"
      >
        {updatedChildren}
      </div>
      <button
        aria-label="previous image"
        onClick={(e) => {
          e.stopPropagation();
          if (!transitioning.current) {
            transitioning.current = true;
            const newSlideNumber = (slideNumber - 1 + len) % len;
            setSlideNumber(newSlideNumber);
            onUpdate?.(newSlideNumber);
          }
        }}
        hidden={slideNumber == 0}
        onPointerMove={(e) => e.stopPropagation()}
        className="carousel__button carousel__prev"
      >
        <BsArrowLeft />
      </button>
      <button
        aria-label="next image"
        onClick={(e) => {
          e.stopPropagation();
          if (!transitioning.current) {
            transitioning.current = true;
            const newSlideNumber = (slideNumber + 1) % len;
            setSlideNumber(newSlideNumber);
            onUpdate?.(newSlideNumber);
          }
        }}
        hidden={slideNumber == len - 1}
        onPointerMove={(e) => e.stopPropagation()}
        className="carousel__button carousel__next"
      >
        <BsArrowRight />
      </button>
    </div>
  );
}

interface PropTypes {
  children: React.ReactNode;
  aIndex: number;
  onUpdate?: Function;
}
