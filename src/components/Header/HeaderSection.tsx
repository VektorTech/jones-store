import Link from "next/link";
import Image from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import { BsCart3, BsPerson } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";

import logoImg from "@Images/jones-logo.png";
import { useLayout } from "./Sidebar";
import useScrollTop from "@Lib/hooks/useScrollTop";
import { useEffect, useRef, useState } from "react";

export default function HeaderSection() {
  const { sidebarVisible, setSidebarVisibility } = useLayout();

  const [pinnedState, setPinnedState] = useState(false);
  const scrollTop = useScrollTop();
  const lastScroll = useRef(scrollTop);

  useEffect(() => {
    if (scrollTop >= 135) {
      setPinnedState(lastScroll.current > scrollTop);
      lastScroll.current = scrollTop;
    } else {
      setPinnedState(false);
    }
  }, [scrollTop]);

  return (
    <header className={`header${pinnedState ? " header--pinned" : ""}`}>
      <div className="header__container">
        <div className="header__menu-button">
          <button
            className="header__menu-toggle"
            onClick={() => setSidebarVisibility(true)}
          >
            <FiMenu />
          </button>
        </div>

        <div className="header__logo">
          <Link href="/">
            <a>
              <Image width={74} height={46} alt="" src={logoImg} />
            </a>
          </Link>
        </div>

        <div className="header__nav">
          <nav>
            <ul>
              <li className="header__nav-link">
                <Link href="/">
                  <a>MEN</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/">
                  <a>WOMEN</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/">
                  <a>KIDS</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/">
                  <a>BABY</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/">
                  <a>UNISEX</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__buttons">
          <ul>
            <li className="header__button header__button-search">
              <Link href="/">
                <a>
                  <FiSearch />
                </a>
              </Link>
            </li>
            <li className="header__button header__button-account">
              <Link href="/">
                <a>
                  <BsPerson />
                </a>
              </Link>
            </li>
            <li className="header__button header__button-wishlist">
              <span>12</span>
              <Link href="/">
                <a>
                  <AiOutlineHeart />
                </a>
              </Link>
            </li>
            <li className="header__button header__button-cart">
              <span>3</span>
              <Link href="/">
                <a>
                  <BsCart3 />
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
