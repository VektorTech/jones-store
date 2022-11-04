import { DialogType, useDialog } from "@Lib/contexts/UIContext";
import React, { useState, useRef, useEffect } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import Modal from "./Modal";

export default function Carousel({
  children,
  aIndex,
  onUpdate,
}: {
  children: React.ReactNode;
  aIndex: number;
  onUpdate?: Function;
}) {
  const carousel = useRef<HTMLDivElement>(null);
  const slidesContainer = useRef<HTMLDivElement>(null);
  const transitioning = useRef<boolean>(false);
  const { currentDialog, setDialog } = useDialog();
  const activeModal = currentDialog == DialogType.MODAL_PRODUCT_VIEW;
  const [slideNumber, setSlideNumber] = useState(aIndex);
  const [carouselWidth, setCarouselWidth] = useState(
    carousel.current?.clientWidth || 0
  );

  const getChildrenAsSlides = (): Array<React.ReactNode> | undefined => {
    if (Array.isArray(children)) {
      return React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          className:
            (child.props.className || "") +
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
    setSlideNumber(0);
  }, [children]);

  useEffect(() => {
    setSlideNumber(aIndex);
  }, [aIndex]);

  useEffect(() => {
    onUpdate?.(slideNumber);
  }, [slideNumber]);

  useEffect(() => {
    if (carousel.current) {
      setCarouselWidth(carousel.current.clientWidth);
    }
    const handleResize = () => {
      setCarouselWidth(carousel.current?.clientWidth || 0);
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

  const handleMouseOver: React.MouseEventHandler<HTMLDivElement> = ({
    clientX,
    clientY,
  }) => {
    const activeSlide = slidesContainer.current?.querySelector(
      ".carousel__slide--active"
    );
    if (activeSlide instanceof HTMLElement) {
      const carouselBounds = carousel.current?.getBoundingClientRect();
      const carouselLeft = carouselBounds?.x || 0;
      const carouselTop = carouselBounds?.y || 0;
      const activeSlideWidth = activeSlide.offsetWidth;
      const activeSlideHeight = activeSlide.offsetHeight;
      const activeSlideXMid = activeSlideWidth / 2;
      const activeSlideYMid = activeSlideHeight / 2;

      const shiftX = -(clientX - (carouselLeft + activeSlideXMid));
      const shiftY = -(clientY - (carouselTop + activeSlideYMid));
      activeSlide.style.transform = `scale(3) translate3d(${shiftX}px, ${shiftY}px, 0)`;
    }
  };

  const handleMouseLeave = () => {
    const activeSlide = slidesContainer.current?.querySelector(
      ".carousel__slide--active"
    );
    if (activeSlide instanceof HTMLElement) {
      activeSlide.style.transform = `scale(1) translate3d(0, 0, 0)`;
    }
  };

  return (
    <>
      <div className="carousel" ref={carousel}>
        <div
          ref={slidesContainer}
          style={{ width: `${carouselWidth * len}px` }}
          className="carousel__container"
        >
          {updatedChildren}
        </div>
      </div>
      <Modal size="lg" onClose={() => setDialog(null)} visible={activeModal}>
        <div>{updatedChildren?.[slideNumber]}</div>
      </Modal>
      <div
        onClick={() => setDialog(DialogType.MODAL_PRODUCT_VIEW)}
        onMouseMove={handleMouseOver}
        onMouseOut={handleMouseLeave}
        className="product-view__gallery-controls"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!transitioning.current) {
              transitioning.current = true;
              setSlideNumber((slideNumber - 1 + len) % len);
            }
          }}
          onMouseMove={(e) => e.stopPropagation()}
          className="gallery__prev"
        >
          <BsArrowLeft />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!transitioning.current) {
              transitioning.current = true;
              setSlideNumber((slideNumber + 1) % len);
            }
          }}
          onMouseMove={(e) => e.stopPropagation()}
          className="gallery__next"
        >
          <BsArrowRight />
        </button>
      </div>
    </>
  );
}
