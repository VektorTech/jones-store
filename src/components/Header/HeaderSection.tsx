import Link from "next/link";
import Image from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import { BsCart3, BsPerson } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";

import logoImg from "@Images/jones-logo.png";

import useScrollTop from "@Lib/hooks/useScrollTop";
import { useEffect, useRef, useState } from "react";
import { useAnnouncementState, useDialog } from "@Lib/contexts/UIContext";

export default function HeaderSection() {
  const { setDialog } = useDialog();

  const [pinnedState, setPinnedState] = useState(false);
  const scrollTop = useScrollTop();
  const lastScroll = useRef(scrollTop);

  const announcementVisible = useAnnouncementState();

  useEffect(() => {
    if (scrollTop >= (announcementVisible ? 135 : 100)) {
      setPinnedState(lastScroll.current > scrollTop);
      lastScroll.current = scrollTop;
    } else {
      setPinnedState(false);
    }
  }, [scrollTop, announcementVisible]);

  return (
    <header className={`header${pinnedState ? " header--pinned" : ""}`}>
      <div className="header__container">
        <div className="header__menu-button">
          <button
            className="header__menu-toggle"
            onClick={() => setDialog("SIDEBAR_DIALOG")}
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
              <Link href="#">
                <a onClick={(e) => { e.preventDefault(); setDialog("SEARCH_BOX"); }}>
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
