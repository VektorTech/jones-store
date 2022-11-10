import Link from "next/link";
import Image from "next/future/image";

import { AiOutlineHeart } from "react-icons/ai";
import { BsCart3, BsPerson } from "react-icons/bs";
import { FiSearch, FiMenu } from "react-icons/fi";
import { BiCaretDown } from "react-icons/bi";

import logoImg from "@Images/jones-logo.png";

import useScrollTop from "@Lib/hooks/useScrollTop";
import { useEffect, useRef, useState } from "react";
import { DialogType, useDialog } from "@Lib/contexts/UIContext";
import { useAuthState } from "@Lib/contexts/AuthContext";
import Popup from "@Components/common/Popup";
import Form from "@Components/common/Form";
import { CartItem } from "@prisma/client";
import { getPathString } from "@Lib/utils";
import { useRouter } from "next/router";
import Logo from "@Components/common/Logo";
const CategoriesData = require("@Lib/CategoriesData.json");

export default function HeaderSection({
  announcementVisible,
}: {
  announcementVisible?: boolean;
}) {
  const { setDialog } = useDialog();

  const [dropdownNav, setDropdownNav] = useState<JSX.Element[] | null>(null);
  const [pinnedState, setPinnedState] = useState(false);
  const scrollTop = useScrollTop();
  const headerRef = useRef<HTMLElement>(null);

  const { user } = useAuthState();
  const isAuth = user?.isAuth;
  const wishlistCount = user?.wishlist?.length;
  const cartCount = user?.cart?.length;
  const cartTotal = user?.cartTotal;

  useEffect(() => {
    const mainBanner = document.getElementById("main-banner");

    if (mainBanner) {
      setPinnedState(
        scrollTop > mainBanner?.offsetTop + mainBanner?.clientHeight
      );
    }
  }, [scrollTop]);

  const router = useRouter();

  useEffect(() => {
    const hideDropdown = () => setDropdownNav(null);
    router.events.on("routeChangeStart", hideDropdown);
    return () => router.events.off("routeChangeStart", hideDropdown);
  }, [router]);

  const [hoveredElement, setHoveredElement] = useState<string>("");

  return (
    <>
      <header
        ref={headerRef}
        className={`header${pinnedState ? " header--pinned" : ""}`}
      >
        <div className="header__container">
          <div className="header__menu-button">
            <button
              className="header__menu-toggle"
              onClick={() => setDialog(DialogType.SIDEBAR_DIALOG)}
            >
              <FiMenu />
            </button>
          </div>

          <div className="header__logo">
            <Logo />
          </div>

          <div className="header__nav">
            <nav>
              <ul>
                <li className="header__nav-link">
                  <Link href="#">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownNav(
                          dropdownNav == ColorwaysList ? null : ColorwaysList
                        );
                      }}
                    >
                      COLORWAYS <BiCaretDown className="header__nav-caret" />
                    </a>
                  </Link>
                </li>
                <li className="header__nav-link">
                  <span>|</span>
                </li>
                <li className="header__nav-link">
                  <Link href="#">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownNav(
                          dropdownNav == MenCategoriesList
                            ? null
                            : MenCategoriesList
                        );
                      }}
                    >
                      MEN <BiCaretDown className="header__nav-caret" />
                    </a>
                  </Link>
                </li>
                <li className="header__nav-link">
                  <Link href="#">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownNav(
                          dropdownNav == WomenCategoriesList
                            ? null
                            : WomenCategoriesList
                        );
                      }}
                    >
                      WOMEN <BiCaretDown className="header__nav-caret" />
                    </a>
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
                <Link href="./#">
                  <a
                    className="header__button-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setDialog(DialogType.SEARCH_BOX);
                    }}
                  >
                    <FiSearch />
                  </a>
                </Link>
              </li>
              <li className="header__button header__button-account">
                <Link href={isAuth ? "/profile" : "/signin"}>
                  <a
                    onPointerEnter={(e) =>
                      setHoveredElement("header-account-btn")
                    }
                    onPointerLeave={(e) => setHoveredElement("")}
                    className="header__button-link"
                    id="header-account-btn"
                  >
                    <BsPerson />
                    <Popup
                      currentId={hoveredElement}
                      hoverElementId="header-account-btn"
                    >
                      {isAuth ? (
                        <>
                          <Link href="/profile">
                            <a className="header__popup-button">
                              <span>Profile</span>
                            </a>
                          </Link>
                          <Form
                            afterSubmit={(data) => {
                              if (data.success) {
                                location.reload();
                              }
                            }}
                            action="/api/auth/signout"
                          >
                            <input
                              className="header__popup-button"
                              type="submit"
                              value="Log Out"
                            />
                          </Form>
                        </>
                      ) : (
                        <>
                          <Link href="/signin">
                            <a className="header__popup-button">
                              <span>Log In</span>
                            </a>
                          </Link>
                          <Link href="/signup">
                            <a className="header__popup-button">
                              <span>Register</span>
                            </a>
                          </Link>
                        </>
                      )}
                    </Popup>
                  </a>
                </Link>
              </li>
              <li className="header__button header__button-wishlist">
                <Link href="/wishlist">
                  <a className="header__button-link">
                    <AiOutlineHeart />
                  </a>
                </Link>
                {wishlistCount ? <span>{wishlistCount}</span> : null}
              </li>
              <li className="header__button header__button-cart">
                <button
                  onClick={() => setDialog(DialogType.CART)}
                  onPointerEnter={(e) => setHoveredElement("header-cart-btn")}
                  onPointerLeave={(e) => setHoveredElement("")}
                  className="header__button-link"
                  id="header-cart-btn"
                >
                  <BsCart3 />
                  <Popup
                    currentId={hoveredElement}
                    hoverElementId="header-cart-btn"
                  >
                    {cartCount ? (
                      <span style={{ fontWeight: "400" }}>${cartTotal}</span>
                    ) : (
                      "Empty"
                    )}
                  </Popup>
                </button>
                {cartCount ? <span>{cartCount}</span> : null}
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div
        className={
          "header__dropdown" +
          (dropdownNav ? " header__dropdown--visible" : "") +
          (pinnedState ? " header__dropdown--pinned" : "")
        }
      >
        <ul>{dropdownNav}</ul>
      </div>
    </>
  );
}

const ColorwaysList = CategoriesData.colorways.map((name: string) => (
  <li key={name} className="sidebar__links-item">
    <Link href={"/category/colorways?colorways=" + name}>
      <a className="sidebar__anchor">{name}</a>
    </Link>
  </li>
));

const MenCategoriesList = [
  <li key={"men-sidebar"} className="sidebar__links-item">
    <Link href={"/category/men"}>
      <a className="sidebar__anchor">ALL MEN</a>
    </Link>
  </li>,
].concat(
  CategoriesData.men.map((name: string) => (
    <li key={name} className="sidebar__links-item">
      <Link href={"/category/men/" + getPathString(name)}>
        <a className="sidebar__anchor">{name}</a>
      </Link>
    </li>
  ))
);

const WomenCategoriesList = [
  <li key={"men-sidebar"} className="sidebar__links-item">
    <Link href={"/category/women"}>
      <a className="sidebar__anchor">ALL WOMEN</a>
    </Link>
  </li>,
].concat(
  CategoriesData.women.map((name: string) => (
    <li key={name} className="sidebar__links-item">
      <Link href={"/category/women/" + getPathString(name)}>
        <a className="sidebar__anchor">{name}</a>
      </Link>
    </li>
  ))
);
