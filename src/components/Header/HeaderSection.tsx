import Link from "next/link";
import Image from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import { BsCart3, BsPerson } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";

import logoImg from "@Images/jones-logo.png";

import useScrollTop from "@Lib/hooks/useScrollTop";
import { useEffect, useRef, useState } from "react";
import { useDialog } from "@Lib/contexts/UIContext";
import { useAuthState } from "@Lib/contexts/AuthContext";
import Popup from "@Components/common/Popup";

export default function HeaderSection({
  announcementVisible,
}: {
  announcementVisible?: boolean;
}) {
  const { setDialog } = useDialog();

  const [pinnedState, setPinnedState] = useState(false);
  const scrollTop = useScrollTop();
  const lastScroll = useRef(scrollTop);

  const { user } = useAuthState();
  const wishlistCount = user?.wishlist?.length;
  const cartCount = user?.cart?.length;

  useEffect(() => {
    const ANNOUNCEMENT_BANNER_HEIGHT = 35;
    const headerHeight =
      Number(
        getComputedStyle(document.body)
          .getPropertyValue("--header-height")
          .replace("rem", "")
      ) * 10;
    if (
      scrollTop >=
      (announcementVisible
        ? headerHeight + ANNOUNCEMENT_BANNER_HEIGHT
        : headerHeight)
    ) {
      setPinnedState(lastScroll.current > scrollTop);
      lastScroll.current = scrollTop;
    } else {
      setPinnedState(false);
    }
  }, [scrollTop, announcementVisible]);

  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);

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
              <Image width={80} height={46} alt="" src={logoImg} />
            </a>
          </Link>
        </div>

        <div className="header__nav">
          <nav>
            <ul>
              <li className="header__nav-link">
                <Link href="/category/men">
                  <a>MEN</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/category/women">
                  <a>WOMEN</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/category/kids">
                  <a>KIDS</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/category/baby">
                  <a>BABY</a>
                </Link>
              </li>
              <li className="header__nav-link">
                <Link href="/category/unisex">
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
                <a
                  className="header__button-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setDialog("SEARCH_BOX");
                  }}
                >
                  <FiSearch />
                </a>
              </Link>
            </li>
            <li className="header__button header__button-account">
              <Link href="/profile">
                <a
                  onPointerEnter={(e) => setHoveredElement(e.currentTarget)}
                  onPointerLeave={(e) => setHoveredElement(null)}
                  className="header__button-link">
                  <BsPerson />
                  <Popup hoverElement={hoveredElement}>
                    Sign In <br/> Sign Up
                  </Popup>
                </a>
              </Link>
            </li>
            <li className="header__button header__button-wishlist">
              {wishlistCount ? <span>{wishlistCount}</span> : null}
              <Link href="/wishlist">
                <a className="header__button-link">
                  <AiOutlineHeart />
                </a>
              </Link>
            </li>
            <li className="header__button header__button-cart">
              {cartCount ? <span>{cartCount}</span> : null}
              <Link href="/cart">
                <a className="header__button-link">
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
