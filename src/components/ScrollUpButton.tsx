import Image from "next/image";
import { useRef } from "react";

import useScrollTop from "@Lib/hooks/useScrollTop";

import ShoePrint from "@Images/jordan-shoe-print.png";

export function ScrollUpButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollTop = useScrollTop();

  if (buttonRef.current) {
    const scrollRatio =
      scrollTop / (document.documentElement.scrollHeight - innerHeight);

    buttonRef.current.style.setProperty(
      "--animation-duration-offset",
      scrollRatio.toString()
    );

    buttonRef.current.classList.toggle("scroll-up--active", scrollRatio > 0.3);
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
          unoptimized={true}
          width={211}
          height={559}
          src={ShoePrint}
        />
      </div>
      <div className="scroll-up__container">
        <Image
          layout="responsive"
          className="scroll-up__image"
          alt=""
          unoptimized={true}
          width={211}
          height={559}
          src={ShoePrint}
        />
      </div>
    </button>
  );
}
