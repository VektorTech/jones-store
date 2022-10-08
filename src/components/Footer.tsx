import Link from "next/link";
import Image from "next/future/image";
import NextImage from "next/image";
import { BiMap, BiPhone, BiTime } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { CgArrowLongRight } from "react-icons/cg";

import logoImg from "@Images/jones-logo.png";
import SocialIcons from "./common/SocialIcons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <Link href="/">
              <a>
                <Image width={74} height={46} alt="" src={logoImg} />
              </a>
            </Link>
          </div>
          <h3 className="footer__sub-heading">Contact</h3>
          <p className="footer__contact">
            <BiMap className="footer__contact-icon" />
            <span className="footer__contact-info">
              46 Lakeshore St. Knoxville,
              <br />
              TN 37918
            </span>
          </p>
          <p className="footer__contact">
            <BiPhone className="footer__contact-icon" />
            <span className="footer__contact-info">
              <a className="footer__contact-link" href="tel:13124786691">
                +1 (312) 478 6691
              </a>
            </span>
          </p>
          <p className="footer__contact">
            <HiOutlineMail className="footer__contact-icon" />
            <span className="footer__contact-info">
              <a
                className="footer__contact-link"
                href="mailto:support@jones.com?subject=Need%20Support"
              >
                support@
                <wbr />
                jones.com
              </a>
            </span>
          </p>
          <p className="footer__contact">
            <BiTime className="footer__contact-icon" />
            <span className="footer__contact-info">
              10:00 &mdash; 18:00, Mon &mdash; Sat
            </span>
          </p>
          <hr className="footer__hr" />
          <h3 className="footer__sub-heading">Connect With Us</h3>
          <div className="footer__social-buttons">
            <SocialIcons size="md" />
          </div>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">about</h3>
          <ul>
            <li className="footer__link">
              <Link href="/">
                <a>About Us</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>Delivery Information</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>Contact Us</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>Returns</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>F.A.Q</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>Site Map</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">my account</h3>
          <ul>
            <li className="footer__link">
              <Link href="/">
                <a>Sign In</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>View Cart</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>My Wishlist</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a>Track My Order</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <div className="newsletter">
            <h3 className="footer__heading">newsletter</h3>
            <p className="newsletter__info">
              Sign up to our newsletter and we&apos;ll keep you up-to-date with
              the latest arrivals and special offers.
            </p>
            <form action="">
              <div className="newsletter__input input input--red input--bottom">
                <input
                  id="newsletter_input"
                  className="input__box"
                  type="email"
                  name="email"
                  inputMode="email"
                  placeholder="ENTER EMAIL"
                  required
                  spellCheck={"false"}
                />
                <label
                  htmlFor="newsletter_input"
                  className="input__placeholder"
                >
                  enter email
                </label>
                <button className="input__submit" type="submit">
                  <CgArrowLongRight className="input__submit-icon" />
                </button>
              </div>
              <p className="newsletter__disclaimer">
                By signing up you are confirming that you have read, understood
                and accept our{" "}
                <Link href="/">
                  <a>Privacy Policy</a>
                </Link>
              </p>
            </form>
            <div className="footer__payments">
              <NextImage
                src="/assets/images/payment.png"
                alt=""
                width={327}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="gutter">
        <div className="gutter__container">
          <div className="gutter__terms">
            <Link href="/">
              <a className="gutter__terms-link">Terms</a>
            </Link>
            <span className="gutter__terms-space"></span>
            <Link href="/">
              <a className="gutter__terms-link">Privacy</a>
            </Link>
          </div>
          <div className="gutter__copy">
            <small>
              &copy; {new Date().getFullYear()} Jones LLC. All Rights Reserved
            </small>
          </div>
          <div className="gutter__lang-currency language-currency">
            <button className="language-currency__btn">
              {"English"} <span className="language-currency__sep">|</span>{" "}
              {"$ USD"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
