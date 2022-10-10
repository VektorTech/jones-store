import { useDialog, Dialogs } from "@Lib/contexts/UIContext";
import { useUserState } from "@Lib/contexts/UserContext";
import useTabTrapIn from "@Lib/hooks/useTabTrapIn";
import Link from "next/link";
import React, {
  useEffect,
  useState,
  useRef
} from "react";
import { AiOutlineHeart } from "react-icons/ai";

import { BsCart3, BsXLg, BsPerson } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const menCategories = [
  {
    name: "OG LOW",
    path: "",
  },
  {
    name: "LOW PHAT",
    path: "",
  },
  {
    name: "MID PHAT",
    path: "",
  },
  {
    name: "ALPHA",
    path: "",
  },
  {
    name: "85",
    path: "",
  },
  {
    name: "RETRO HIGH SB",
    path: "",
  },
  {
    name: "HIGH ZOOM",
    path: "",
  },
  {
    name: "RARE AIR",
    path: "",
  },
  {
    name: "FLYKNIT",
    path: "",
  },
  {
    name: "STRAP",
    path: "",
  },
  {
    name: "ULTRA",
    path: "",
  },
];

const womenCategories = [
  {
    name: "OG LOW",
    path: "",
  },
  {
    name: "LOW SLIP",
    path: "",
  },
  {
    name: "LOW LIFT",
    path: "",
  },
  {
    name: "NEW RETRO",
    path: "",
  },
  {
    name: "MIDS",
    path: "",
  },
  {
    name: "OG HIGH",
    path: "",
  },
  {
    name: "ZOOM COMFORT",
    path: "",
  },
  {
    name: "WILD",
    path: "",
  },
];

const colorways = [
  {
    name: "Dark Mocha",
    path: "",
  },
  {
    name: "University Blue Black",
    path: "",
  },
  {
    name: "Chicago",
    path: "",
  },
  {
    name: "Lucky Green",
    path: "",
  },
  {
    name: "Pink Glaze",
    path: "",
  },
  {
    name: "Court Purple",
    path: "",
  },
  {
    name: "Clay Green",
    path: "",
  },
  {
    name: "Twist W Panda",
    path: "",
  },
  {
    name: "Midnight Navy",
    path: "",
  },
  {
    name: "Yellow Toe",
    path: "",
  },
  {
    name: "Shadow",
    path: "",
  },
  {
    name: "Bred",
    path: "",
  },
];

export default function Sidebar() {
  const [submenu, setSubmenu] = useState<Array<any> | null>(null);
  const [submenuActive, setSubmenuActive] = useState<boolean>(false);

  const { currentDialog, setDialog } = useDialog();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarVisible = currentDialog == Dialogs.SIDEBAR_DIALOG;
  useTabTrapIn(sidebarRef.current, sidebarVisible);

  useEffect(() => {
    setTimeout(() => !submenuActive && setSubmenu(null), 600);
  }, [submenuActive]);

  const { user, isLoading, userSessionId, isError } = useUserState();
  console.log(user, isError, userSessionId, isLoading);

  const ColorwaysList = colorways.map(({ name, path }) => (
    <li key={name} className="sidebar__links-item">
      <Link href={path}>
        <a>{name}</a>
      </Link>
    </li>
  ));
  const MenCategoriesList = menCategories.map(({ name, path }) => (
    <li key={name} className="sidebar__links-item">
      <Link href={path}>
        <a>{name}</a>
      </Link>
    </li>
  ));
  const WomenCategoriesList = womenCategories.map(({ name, path }) => (
    <li key={name} className="sidebar__links-item">
      <Link href={path}>
        <a>{name}</a>
      </Link>
    </li>
  ));

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
          <button onClick={() => setDialog("SEARCH_BOX")} className="sidebar__search-box">
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
                <Link href="">
                  <a>HOME</a>
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
                <Link href="/">
                  <a>KIDS</a>
                </Link>
              </li>
              <li className="sidebar__links-item">
                <Link href="/">
                  <a>BABY</a>
                </Link>
              </li>
              <li className="sidebar__links-item">
                <Link href="/">
                  <a>UNISEX</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebar__icon-links">
            <ul>
              <li className="sidebar__icon-links-item">
                  { user ? (
                      <Link href="/">
                        <a>
                          <BsPerson />
                          <span>Logout</span>
                        </a>
                      </Link>
                    ) : (
                      <Link href="/">
                        <a>
                          <BsPerson />
                          <span>Login / Register</span>
                        </a>
                      </Link>
                    )
                  }
              </li>
              <li className="sidebar__icon-links-item">
                <Link href="/">
                  <a>
                    <AiOutlineHeart />
                    <span>Wishlist</span>
                  </a>
                </Link>
              </li>
              <li className="sidebar__icon-links-item">
                <Link href="/">
                  <a>
                    <BsCart3 />
                    <span>Cart</span>
                  </a>
                </Link>
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
