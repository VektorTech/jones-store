import { useDialog, DialogType } from "@Lib/contexts/UIContext";
import { useAuthState } from "@Lib/contexts/AuthContext";
import useTabTrapIn from "@Lib/hooks/useKeyTrap";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { AiOutlineHeart } from "react-icons/ai";

import { BsCart3, BsXLg, BsPerson } from "react-icons/bs";
import { FiSearch, FiLogOut, FiLogIn } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { getPathString } from "@Lib/utils";
import Form from "@Components/common/Form";
import { CartItem } from "@prisma/client";

const CategoriesData = require("@Lib/CategoriesData.json");

export default function Sidebar({ userId }: { userId?: string }) {
  const [submenu, setSubmenu] = useState<Array<any> | null>(null);
  const [submenuActive, setSubmenuActive] = useState<boolean>(false);

  const { currentDialog, setDialog } = useDialog();

  const { user } = useAuthState();
  const isAuth = user?.isAuth;
  const wishlistCount = user?.wishlist?.length;
  const cartCount = user?.cart.length;
  const cartTotal = user?.cartTotal;

  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarVisible = currentDialog == DialogType.SIDEBAR_DIALOG;
  useTabTrapIn(sidebarRef.current, sidebarVisible);

  useEffect(() => {
    setTimeout(() => !submenuActive && setSubmenu(null), 600);
  }, [submenuActive]);

  return (
    <div
      className={`sidebar${sidebarVisible ? " sidebar--active" : ""}`}
      onClick={() => setDialog(null)}
    >
      <button className="sidebar__close">
        <BsXLg className="sidebar__close-icon" />
      </button>
      <nav
        className={`sidebar__nav${
          submenuActive ? " sidebar__nav--submenu" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={sidebarRef} className="sidebar__container">
          <button
            onClick={() => setDialog(DialogType.SEARCH_BOX)}
            className="sidebar__search-box"
          >
            <span className="sidebar__search-box-label">
              Search Jones Store
            </span>
            <span className="sidebar__search-box-icon">
              <FiSearch />
            </span>
          </button>
          <div className="sidebar__links">
            <ul>
              <li className="sidebar__links-item">
                <Link href="/">
                  <a className="sidebar__anchor">HOME</a>
                </Link>
              </li>
              <li className="sidebar__links-item sidebar__links-menu">
                <button
                  onClick={() => {
                    setSubmenu(ColorwaysList);
                    setSubmenuActive(true);
                  }}
                >
                  <span>COLORWAYS</span>
                  <IoIosArrowForward />
                </button>
              </li>
              <li className="sidebar__links-item sidebar__links-menu">
                <button
                  onClick={() => {
                    setSubmenu(MenCategoriesList);
                    setSubmenuActive(true);
                  }}
                >
                  <span>MEN</span>
                  <IoIosArrowForward />
                </button>
              </li>
              <li className="sidebar__links-item sidebar__links-menu">
                <button
                  onClick={() => {
                    setSubmenu(WomenCategoriesList);
                    setSubmenuActive(true);
                  }}
                >
                  <span>WOMEN</span>
                  <IoIosArrowForward />
                </button>
              </li>
              <li className="sidebar__links-item">
                <Link href="/category/kids">
                  <a className="sidebar__anchor">KIDS</a>
                </Link>
              </li>
              <li className="sidebar__links-item">
                <Link href="/category/baby">
                  <a className="sidebar__anchor">BABY</a>
                </Link>
              </li>
              <li className="sidebar__links-item">
                <Link href="/category/unisex">
                  <a className="sidebar__anchor">UNISEX</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar__icon-links">
            <ul>
              {isAuth ? (
                <li className="sidebar__icon-links-item">
                  <Link href="/profile">
                    <a className="sidebar__anchor">
                      <BsPerson />
                      <span>Profile</span>
                    </a>
                  </Link>
                </li>
              ) : null}
              <li className="sidebar__icon-links-item">
                {isAuth ? (
                  <Form
                    afterSubmit={(data) => {
                      if (data.success) {
                        location.reload();
                      }
                    }}
                    action="/api/auth/signout"
                  >
                    <button className="sidebar__link-btn" type="submit">
                      <FiLogOut />
                      Logout
                    </button>
                  </Form>
                ) : (
                  <Link href="/signin">
                    <a className="sidebar__anchor">
                      <FiLogIn />
                      <span>Login / Register</span>
                    </a>
                  </Link>
                )}
              </li>
              <li className="sidebar__icon-links-item">
                <Link href="/wishlist">
                  <a className="sidebar__anchor">
                    <AiOutlineHeart />
                    <span>
                      Wishlist{wishlistCount ? ` (${wishlistCount})` : ""}
                    </span>
                  </a>
                </Link>
              </li>
              <li className="sidebar__icon-links-item">
                <button onClick={() => setDialog(DialogType.CART)} className="sidebar__anchor">
                  <BsCart3 />
                  <span>
                    Cart{cartCount ? ` (${cartCount}) ($${cartTotal})` : ""}
                  </span>
                </button>
              </li>
            </ul>
          </div>
          <div className="sidebar__lang-currency language-currency">
            <button className="language-currency__btn">
              {"English"} <span className="language-currency__sep">|</span>{" "}
              {"$ USD"}
            </button>
          </div>
        </div>

        <div className="sidebar__container sidebar__submenu-container">
          <div className="sidebar__links-2">
            <ul hidden={submenu == null}>
              <li className="sidebar__links-item sidebar__back-button">
                <button onClick={() => setSubmenuActive(false)}>
                  <IoIosArrowBack />
                  <span>BACK</span>
                </button>
              </li>
              {submenu}
            </ul>
          </div>
        </div>
      </nav>
    </div>
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
      <a className="sidebar__anchor">all men</a>
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
      <a className="sidebar__anchor">all women</a>
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
