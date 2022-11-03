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
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          className: (child.props.className || "") + " carousel__slide",
          width: carouselWidth
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
        className="product-view__gallery-controls"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!transitioning.current && slideNumber > 0) {
              transitioning.current = true;
              setSlideNumber(Math.max(0, slideNumber - 1));
            }
          }}
          className={
            "gallery__prev" +
            (slideNumber == 0 ? " carousel__control--hidden" : "")
          }
        >
          <BsArrowLeft />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!transitioning.current && slideNumber < len - 1) {
              transitioning.current = true;
              setSlideNumber(Math.min(len - 1, slideNumber + 1));
            }
          }}
          className={
            "gallery__next" +
            (slideNumber == len - 1 ? " carousel__control--hidden" : "")
          }
        >
          <BsArrowRight />
        </button>
      </div>
    </>
  );
}
