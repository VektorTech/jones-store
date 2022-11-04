import StepImage from "@Images/step.png";
import useScrollTop from "@Lib/hooks/useScrollTop";
import Image from "next/image";

import { useRef } from "react";

export function ScrollUpButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollTop = useScrollTop();

  if (buttonRef.current) {
    buttonRef.current.style.setProperty(
      "--animation-duration-offset",
      (
        scrollTop /
        (document.documentElement.scrollHeight - innerHeight)
      ).toString()
    );
  }

  return (
    <button
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      ref={buttonRef}
      className="scroll-up"
    >
      <div className="scroll-up__container">
        <Image
          layout="responsive"
          className="scroll-up__image scroll-up__image--flipped"
          alt=""
		  quality={1}
          width={96}
          height={256}
          src={StepImage}
        />
      </div>
      <div className="scroll-up__container">
        <Image
          layout="responsive"
          className="scroll-up__image"
          alt=""
		  quality={1}
          width={96}
          height={256}
          src={StepImage}
        />
      </div>
    </button>
  );
}
