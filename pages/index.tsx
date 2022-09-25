import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
// import { useEffect } from 'react';
import { withSessionSsr } from "@lib/withSession";

import { AiOutlineMenu, AiOutlineTags, AiOutlineHeart } from "react-icons/ai";
import { BsXLg, BsCart3, BsPerson, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { FiHelpCircle, FiSearch } from "react-icons/fi";
import { BiMap, BiPhone, BiTime } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { CgArrowLongRight } from "react-icons/cg";
import {
  RiRadioButtonLine,
  RiCheckboxBlankCircleFill,
  RiFacebookBoxFill,
  RiInstagramFill,
  RiYoutubeFill,
  RiTwitterFill,
  RiPinterestFill
} from "react-icons/ri";

// import prisma from '@lib/prisma';
import Link from 'next/link';
import Image from 'next/future/image';
import Img from 'next/image';
import LogoImg from '@images/jones-logo.png';
import JordanBanner from '@images/jordan-1-banner.png';

const Home: NextPage = (props) => {
  return (
    <main>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="promo-banner">
        <div className="promo-banner__container">
          <div className="promo-banner__content">
            OFFER: <a href="" className="promo-banner__link">Free Shipping Until January 1st!<FiHelpCircle/></a>
          </div>
          <button className="promo-banner__close">
            <BsXLg />
          </button>
        </div>
      </div>

      <header className='header'>
        <div className="header__container">
          <div className="header__menu-button">
            <button className="header__menu-toggle">
              <AiOutlineMenu />
            </button>
          </div>

          <div className="header__logo">
            <Link href="/">
              <a>
                <Image width={74} height={46} alt="" src={LogoImg} />
              </a>
            </Link>
          </div>

          <div className="header__nav">
            <nav>
              <ul>
                <li className='header__nav-link'><Link href="/"><a>MEN</a></Link></li>
                <li className='header__nav-link'><Link href="/"><a>WOMEN</a></Link></li>
                <li className='header__nav-link'><Link href="/"><a>KIDS</a></Link></li>
                <li className='header__nav-link'><Link href="/"><a>BABY</a></Link></li>
                <li className='header__nav-link'><Link href="/"><a>UNISEX</a></Link></li>
              </ul>
            </nav>
          </div>

          <div className="header__buttons">
            <ul>
              <li className='header__button header__button-search'>
                <Link href="/"><a><FiSearch /></a></Link>
              </li>
              <li className='header__button header__button-account'>
                <Link href="/"><a><BsPerson /></a></Link>
              </li>
              <li className='header__button header__button-wishlist'>
                <span>12</span>
                <Link href="/"><a><AiOutlineHeart /></a></Link>
              </li>
              <li className='header__button header__button-cart'>
                <span>3</span>
                <Link href="/"><a><BsCart3 /></a></Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <section className="banner">
        <div className="banner__container">
          <div className="banner__background"></div>
          <div className="banner__indicators">
            <button className="banner__indicator banner__indicator--active">
              <RiRadioButtonLine />
            </button>
            <button className="banner__indicator">
              <RiCheckboxBlankCircleFill />
            </button>
            <button className="banner__indicator">
              <RiCheckboxBlankCircleFill />
            </button>
          </div>

          <div className="banner__social-buttons">
            <button className="banner__social-button">
              <RiFacebookBoxFill />
            </button>
            <button className="banner__social-button">
              <RiInstagramFill />
            </button>
            <button className="banner__social-button">
              <RiYoutubeFill />
            </button>
            <button className="banner__social-button">
              <RiTwitterFill />
            </button>
            <button className="banner__social-button">
              <RiPinterestFill />
            </button>
          </div>
          <div className="banner__main">
            <div className="banner__content">
              <div className="banner__headings">
                <p className="banner__sub-text">
                  <span>verified</span> authentic sneakers
                </p>
                <h2 className="banner__title-type">heirloom</h2>
                <h3 className="banner__title">retro high og</h3>
              </div>
              <div className="banner__image">
                <Img layout='responsive' width={220} height={144} src={JordanBanner} />
              </div>
              <div className="banner__action-button">
                <Link href="/">
                  <a className="banner__action-button-element"><span>buy yours</span></a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="collections">
        <div className="collections__container">
          <h2 className="collections__heading">#shop collections</h2>
          <p className="collections__sub-text">winter collections &mdash; new modern design</p>
          <div className="collections__grid">
            <div className="collections__block">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/jordan-1-mid.jpg" />
                  <div className="collections__block-content">
                    <h3>Medium</h3>
                    <button>discover</button>
                  </div>
                </a>
              </Link>
            </div>
            <div className="collections__block">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/jordan-1-low.jpg" />
                  <div className="collections__block-content">
                    <h3>Low</h3>
                    <button>discover</button>
                  </div>
                </a>
              </Link>
            </div>
            <div className="collections__block">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/air-jordan-1-high.webp" />
                  <div className="collections__block-content">
                    <h3>High</h3>
                    <button>discover</button>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="products-section__container">
          <h2 className="products-section__heading">#shop new arrivals</h2>
          <div className="products-section__products">

            <div className="product">
              <Link href="">
                <a>
                <div className="product__wrapper">
                  <div className="product__image">
                    <Img src="/assets/images/jordan-1-product-img.jpeg" objectFit='cover' objectPosition={"center top"} layout='fill' />
                    <span className="product__tag">sale</span>
                    <div className="product__actions">
                      <button className="product__add-wishlist"><AiOutlineHeart /></button>
                    </div>
                  </div>
                  <div className="product__info">
                    <p className="product__type">jordan</p>
                    <h3 className="product__title">Zoom Air Comfort High {"(Women)"}</h3>
                    <div className="product__rating">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarHalf />
                    </div>
                    <p className="product__price">
                      <span className="product__currency">JMD</span>
                      <span className="product__amount">$8,781.80</span>
                      <span className="product__discount-percentage">{"(40% off)"}</span>

                      <span className="product__discount-price">
                        <span className="product__currency">JMD</span>
                        <span className="product__amount">$14,636.34</span>
                      </span>
                    </p>
                  </div>
                </div>
                </a>
              </Link>
            </div>
            <div className="product">
                <Link href="">
                <a>
                  <div className="product__wrapper">
                    <div className="product__image">
                      <Img src="/assets/images/jordan-1-product-img.jpeg" objectFit='cover' objectPosition={"center top"} layout='fill' />
                      <span className="product__tag">sale</span>
                      <div className="product__actions">
                        <button className="product__add-wishlist"><AiOutlineHeart /></button>
                      </div>
                    </div>
                    <div className="product__info">
                      <p className="product__type">jordan</p>
                      <h3 className="product__title">Zoom Air Comfort High {"(Women)"}</h3>
                      <div className="product__rating">
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarHalf />
                        <BsStar />
                      </div>
                      <p className="product__price">
                        <span className="product__currency">JMD</span>
                        <span className="product__amount">$8,781.80</span>
                        <span className="product__discount-percentage">{"(40% off)"}</span>
                        <span className="product__discount-price">
                          <span className="product__currency">JMD</span>
                          <span className="product__amount">$14,636.34</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
                </Link>
            </div>

          </div>
          <p className="products-section__products-link"><Link href="/"><a>View All Products &gt;</a></Link></p>
        </div>
      </section>

      <section className="gender">
        <div className="gender__container">
          {/* <h2 className="gender__heading">#shop gender</h2> */}
          <div className="gender__grid">
            <div className="gender__block gender__block-men">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/man.jpg" />
                  <h3 className="gender__block-heading"><span>shop Men</span></h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-women">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/woman.jpg" />
                  <h3 className="gender__block-heading"><span>shop Women</span></h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-kids">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/kid.webp" />
                  <h3 className="gender__block-heading"><span>shop Kids</span></h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-babies">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/baby.jpeg" />
                  <h3 className="gender__block-heading"><span>shop Babies</span></h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-unisex">
              <Link href="/">
                <a>
                  <Img alt="" layout="fill" src="/assets/images/unisex.jpg" />
                  <h3 className="gender__block-heading"><span>shop Unisex</span></h3>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="products-section__container">
          <h2 className="products-section__heading">#shop best sellers</h2>
          <div className="products-section__products"></div>
          <p className="products-section__products-link"><Link href="/"><a>View All Products &gt;</a></Link></p>
        </div>
      </section>

      <section className="features">
        <div className="features__container">
          <div className="features__col">
            <div className="features__icon"><AiOutlineTags /></div>
            <h3 className='features__title'>100% money-back guarantee</h3>
            <p className='features__text'>We offer a <strong>100% money-back guarantee</strong> for any returns in the 14 days protection.</p>
          </div>
          <div className="features__col">
            <div className="features__icon"><TbTruckDelivery /></div>
            <h3 className='features__title'>free shipping</h3>
            <p className='features__text'>No matter where you are from, you&apos;ll have <strong>FREE</strong> shipping purchasing in Jones.</p>
          </div>
          <div className="features__col">
            <div className="features__icon"><MdSupportAgent /></div>
            <h3 className='features__title'>online support</h3>
            <p className='features__text'>Our customer service is <strong>available 24h</strong>.</p>
          </div>
          <div className="features__col">
            <div className="features__icon"><RiSecurePaymentLine /></div>
            <h3 className='features__title'>secure payment</h3>
            <p className='features__text'><strong>All cards</strong> accepted.</p>
          </div>
        </div>
      </section>

      <footer className='footer'>
        <div className="footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <Link href="/">
                <a>
                  <Image width={74} height={46} alt="" src={LogoImg} />
                </a>
              </Link>
            </div>
            <h3 className="footer__sub-heading">Contact</h3>
            <p className='footer__contact'><BiMap/><span>46 Lakeshore St. Knoxville, TN 37918</span></p>
            <p className='footer__contact'><BiPhone /><span><a href="tel:13124786691">+1 (312) 478 6691</a></span></p>
            <p className='footer__contact'><HiOutlineMail /><span><a href="mailto:support@jones.com?subject=Need%20Support">support@jones.com</a></span></p>
            <p className='footer__contact'><BiTime /><span>10:00 &mdash; 18:00, Mon &mdash; Sat</span></p>
            <hr />
            <h3 className="footer__sub-heading">Connect With Us</h3>
            <div className="footer__social-buttons">
              <button className="footer__social-button">
                <RiFacebookBoxFill />
              </button>
              <button className="footer__social-button">
                <RiInstagramFill />
              </button>
              <button className="footer__social-button">
                <RiYoutubeFill />
              </button>
              <button className="footer__social-button">
                <RiTwitterFill />
              </button>
              <button className="footer__social-button">
                <RiPinterestFill />
              </button>
            </div>
          </div>
          <div className="footer__col">
            <h3 className="footer__heading">about</h3>
            <ul>
              <li className='footer__link'><Link href="/"><a>About Us</a></Link></li>
              <li className='footer__link'><Link href="/"><a>Delivery Information</a></Link></li>
              <li className='footer__link'><Link href="/"><a>Contact Us</a></Link></li>
              <li className='footer__link'><Link href="/"><a>Returns</a></Link></li>
              <li className='footer__link'><Link href="/"><a>F.A.Q</a></Link></li>
              <li className='footer__link'><Link href="/"><a>Site Map</a></Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className="footer__heading">my account</h3>
            <ul>
              <li className='footer__link'><Link href="/"><a>Sign In</a></Link></li>
              <li className='footer__link'><Link href="/"><a>View Cart</a></Link></li>
              <li className='footer__link'><Link href="/"><a>My Wishlist</a></Link></li>
              <li className='footer__link'><Link href="/"><a>Track My Order</a></Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="newsletter">
              <h3 className="footer__heading">newsletter</h3>
              <p className="newsletter__info">Sign up to our newsletter and we&apos;ll keep you up-to-date with the latest arrivals and special offers.</p>
              <form action="">
                <div className="newsletter__input">
                  <label><input type="email" name="email" /><span>enter email</span></label>
                  <button type="submit"><CgArrowLongRight /></button>
                </div>
                <p className="newsletter__disclaimer">By signing up you are confirming that you have read, understood and accept our <Link href="/"><a>Privacy Policy</a></Link></p>
              </form>
              <div className='footer__payments'>
                <Img src="/assets/images/payment.png" alt="" width={327} height={30}/>
              </div>
            </div>
          </div>
        </div>

        <div className="gutter">
          <div className="gutter__container">
            <div className="gutter__terms">
              <Link href="/"><a>Terms</a></Link>
              <span></span>
              <Link href="/"><a>Privacy</a></Link>
            </div>
            <div className="gutter__copy">&copy; {(new Date()).getFullYear()} Jones LLC. All Rights Reserved</div>
            <div className="gutter__lang-currency">
              <button>{"English"} <span></span> {"$ USD"}</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

// use SSG for loading all & SSR to view individual
export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function ({ params, req }) {
    // const user = req.session.user;
    // const results = await prisma.user.findMany();

    return {
      props: {
        // users: results.map(_ => ({..._, createdAt: "", updatedAt: ""}))
      }
    };
  }
);

export default Home;