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
import Form from "@Components/Form";
import { CartItem } from "@prisma/client";

export default function HeaderSection({
  announcementVisible,
}: {
  announcementVisible?: boolean;
}) {
  const { setDialog } = useDialog();

  const [pinnedState, setPinnedState] = useState(false);
  const scrollTop = useScrollTop();
  const lastScroll = useRef(scrollTop);

  const { user, isAuth } = useAuthState();
  const wishlistCount = user?.wishlist?.length;
  const cartCount = user?.cart?.length;
  const cartTotal = (user?.cart || []).reduce(
    (total: number, item: CartItem) => total + item?.total,
    0
  ) || 0;

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

  const [hoveredElement, setHoveredElement] = useState<string>("");

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
                <Link href="#">
                  <a
                    onPointerEnter={(e) =>
                      setHoveredElement("header-colorway-btn")
                    }
                    // onPointerLeave={(e) => setHoveredElement("")}
                    id="header-colorway-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    COLORWAYS
                    <Popup
                      currentId={hoveredElement}
                      hoverElementId="header-colorway-btn"
                    >
                      <div>
                        <ul>{ColorwaysList}</ul>
                      </div>
                    </Popup>
                  </a>
                    onPointerEnter={(e) =>
                      setHoveredElement("header-colorway-btn")
                    }
                    // onPointerLeave={(e) => setHoveredElement("")}
                    id="header-colorway-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    COLORWAYS
                    <Popup
                      currentId={hoveredElement}
                      hoverElementId="header-colorway-btn"
                    >
                      <div>
                        <ul>{ColorwaysList}</ul>
                      </div>
                    </Popup>
                  </a>
                </Link>
              </li>
              <li className="header__nav-link">
                <span>|</span>
              </li>
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
              <Link href="./#">
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
                  onPointerEnter={(e) => setHoveredElement("header-cart-btn")}
                        </Form>
                      </>
                    ) : (
                      <>
                        <Link href="/signin">
                          <a className="header__popup-button">
                            <span>Log In</span>
                          </a>
                        </Link>
                    {cartCount ? (
                      <>
                        <strong>Total</strong>
                        <br />${cartTotal}
                      </>
                    ) : (
                      "Empty"
                    )}
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
              <Link href="/cart">
                <a
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
                      <>
                        <strong>Total</strong>
                        <br />${cartTotal}
                      </>
                    ) : (
                      "Empty"
                    )}
                  </Popup>
                </a>
              </Link>
              {cartCount ? <span>{cartCount}</span> : null}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
