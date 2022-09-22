import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
// import { useEffect } from 'react';
import { withSessionSsr } from "@lib/withSession";

import { AiOutlineMenu, AiOutlineTags, AiOutlineMail, AiOutlineHeart } from "react-icons/ai";
import { BsXLg, BsCart3, BsArrowRight, BsPerson } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { FiHelpCircle, FiSearch } from "react-icons/fi";
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
import JordanBanner from '@images/jordan_1_banner.png';

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
                <Image width={102} height={68} alt="" src={LogoImg} />
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
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
                  <div className="collections__block-content">
                    <h3>High</h3>
                    <button>discover</button>
                  </div>
                </a>
              </Link>
            </div>
            <div className="collections__block">
              <Link href="/">
                <a>
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
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
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
                  <div className="collections__block-content">
                    <h3>Low</h3>
                    <button>discover</button>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="gender">
        <div className="gender__container">
          {/* <h2 className="gender__heading">#shop gender</h2> */}
          <div className="gender__grid">
            <div className="gender__block gender__block-men">
              <Link href="/">
                <a>
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
                  <h3 className="gender__block-heading">Shop Men</h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-women">
              <Link href="/">
                <a>
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
                  <h3 className="gender__block-heading">Shop Women</h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-kids">
              <Link href="/">
                <a>
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
                  <h3 className="gender__block-heading">Shop Kids</h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-babies">
              <Link href="/">
                <a>
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
                  <h3 className="gender__block-heading">Shop Babies</h3>
                </a>
              </Link>
            </div>
            <div className="gender__block gender__block-unisex">
              <Link href="/">
                <a>
                  <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
                  <h3 className="gender__block-heading">Shop Unisex</h3>
                </a>
              </Link>
            </div>
          </div>
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
        </div>
      </section>

      <footer className='footer'>
        <div className="footer__container">
          <div className="footer__col">
            <div className="header__logo">
              <Link href="/">
                <a>
                  <Image width={102} height={68} alt="" src={LogoImg} />
                </a>
              </Link>
            </div>
            <h3 className="footer__sub-heading">Contact</h3>
            <p><strong>Address:</strong> 46 Lakeshore St. Knoxville, TN 37918</p>
            <p><strong>Phone:</strong> <a href="tel:13124786691">Call +1 (312) 478 6691</a></p>
            <p><strong>Email:</strong> <a href="mailto:support@jones.com?subject=Need%20Support">support@jones.com</a></p>
            <p><strong>Hours:</strong> 10:00 &mdash; 18:00, Mon &mdash; Sat</p>
            <hr />
            <h3 className="footer__sub-heading">Connect With Us</h3>
            <div className="footer__social-buttons">
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
          </div>
          <div className="footer__col">
            <div className="footer__heading"><h3>about</h3></div>
            <ul>
              <li><Link href="/"><a>About Us</a></Link></li>
              <li><Link href="/"><a>Delivery Information</a></Link></li>
              <li><Link href="/"><a>Contact Us</a></Link></li>
              <li><Link href="/"><a>Returns</a></Link></li>
              <li><Link href="/"><a>F.A.Q</a></Link></li>
              <li><Link href="/"><a>Site Map</a></Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="footer__heading"><h3>my account</h3></div>
            <ul>
              <li><Link href="/"><a>Sign In</a></Link></li>
              <li><Link href="/"><a>View Cart</a></Link></li>
              <li><Link href="/"><a>My Wishlist</a></Link></li>
              <li><Link href="/"><a>Track My Order</a></Link></li>
            </ul>
          </div>
          <div className="footer__col">
            <div className="newsletter-box">
              <h3 className="newsletter__heading"><AiOutlineMail /> newsletter</h3>
              <p className="newsletter__heading">Sign up to our newsletter and we&apos;ll keep you up-to-date with the latest arrivals and <strong style={{color:"orange"}}>special offers.</strong></p>
              <form action="">
                <div className="newsletter__input">
                  <label><input type="email" name="email" /><span>ENTER EMAIL</span></label>
                  <button type="submit"><BsArrowRight /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="gutter">
          <div className="gutter__container">
            <div className="gutter__terms">
              <Link href="/"><a>Terms</a></Link>
              <Link href="/"><a>Privacy</a></Link>
            </div>
            <div className="gutter__copy">&copy; {(new Date()).getFullYear()} Jones LLC. All Rights Reserved</div>
            <div className="gutter__lang-currency">
              <button>{"English"} &#124; {"$ USD"}</button>
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