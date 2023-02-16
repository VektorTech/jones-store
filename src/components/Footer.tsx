import Link from "next/link";
import NextImage from "next/image";
import { BiMap, BiPhone, BiTime } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";

import SocialIcons from "./common/SocialButtons";
import Dropdown from "./formControls/Dropdown";
import Modal from "./Modal";
import Logo from "./common/Logo";

import { DialogType, useDialog } from "@Contexts/UIContext";

import paymentImage from "@Images/payment.png";
import Form from "./common/Form";
import { toast } from "react-toastify";

export default function Footer() {
  const { currentDialog, setDialog } = useDialog();
  const visible = currentDialog == DialogType.MODAL_LANG_CURRENCY;

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <Logo />
          </div>
          <h3 className="footer__sub-heading">Contact</h3>
          <address>
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
                  href="mailto:support@jones.com?subject=I%20Need%20Support"
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
            <p className="footer__sub-heading">Connect With Us</p>
            <div className="footer__social-buttons">
              <SocialIcons size="md" />
            </div>
          </address>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">about</h3>
          <ul>
            <li className="footer__link">
              <Link href="/about">
                <a>About Us</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/delivery-info">
                <a>Delivery Information</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/contact">
                <a>Contact Us</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/returns">
                <a>Returns</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/faq">
                <a>F.A.Q</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/sitemap.xml">
                <a>Site Map</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">my account</h3>
          <ul>
            <li className="footer__link">
              <Link href="/signin">
                <a>Sign In</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setDialog(DialogType.CART);
                  }}
                >
                  View Cart
                </a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/wishlist">
                <a>My Wishlist</a>
              </Link>
            </li>
            <li className="footer__link">
              <Link href="/track-order">
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
            <Form
              afterSubmit={() => {
                toast(
                  "Thank you for joining our newsletter to receive special offers.",
                  { type: "success" }
                );
              }}
              action="/api/newsletter"
            >
              <div className="newsletter__input input input--red input--bottom">
                <input
                  id="newsletter_input"
                  className="input__box"
                  type="email"
                  name="email"
                  inputMode="email"
                  placeholder="YOUR EMAIL"
                  required
                  spellCheck="false"
                />
                <label
                  htmlFor="newsletter_input"
                  className="input__placeholder"
                >
                  YOUR EMAIL
                </label>
                <button
                  aria-label="add email to newsletter"
                  className="input__submit"
                  type="submit"
                >
                  <FaPaperPlane className="input__submit-icon" />
                </button>
              </div>
              <p className="newsletter__disclaimer">
                By signing up you are confirming that you have read, understood
                and accept our{" "}
                <Link href="/privacy">
                  <a>Privacy Policy</a>
                </Link>
              </p>
            </Form>
            <hr className="footer__hr" />
            <div className="footer__payments">
              <NextImage
                src={paymentImage}
                alt=""
                className="footer__payments-image"
                width={paymentImage.width}
                height={paymentImage.height}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="gutter">
        <div className="gutter__container">
          <div className="gutter__terms">
            <Link href="/terms">
              <a className="gutter__terms-link">Terms</a>
            </Link>
            <span className="gutter__terms-space"></span>
            <Link href="/privacy">
              <a className="gutter__terms-link">Privacy</a>
            </Link>
          </div>
          <div className="gutter__copy">
            &copy;&nbsp;{new Date().getFullYear()}&nbsp;
            <abbr title="Jordan Ones">Jones</abbr>&nbsp;LLC. All Rights Reserved
          </div>
          <div className="gutter__lang-currency language-currency">
            <button
              onClick={() => setDialog(DialogType.MODAL_LANG_CURRENCY)}
              className="language-currency__btn"
            >
              {"English"} <span className="language-currency__sep">|</span>{" "}
              {"$ USD"}
            </button>
          </div>
        </div>
      </div>

      <Modal
        title="Select Language / Currency"
        onClose={() => setDialog(null)}
        size="sm"
        visible={visible}
      >
        <Dropdown
          label="Select Currency"
          options={{
            usd: "USD",
            cad: "CAD",
            gbp: "GBP £",
            eur: "EUR €",
            jmd: "JMD",
          }}
          icons={{
            usd: <NextImage src="https://flagcdn.com/24x18/us.png" width="24" height="18" alt="" />,
            cad: <NextImage src="https://flagcdn.com/24x18/ca.png" width="24" height="18" alt="" />,
            gbp: <NextImage src="https://flagcdn.com/24x18/gb.png" width="24" height="18" alt="" />,
            eur: <NextImage src="https://flagcdn.com/24x18/eu.png" width="24" height="18" alt="" />,
            jmd: <NextImage src="https://flagcdn.com/24x18/jm.png" width="24" height="18" alt="" />
          }}
        />
      </Modal>
    </footer>
  );
}
