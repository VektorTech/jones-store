import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
// import { useEffect } from 'react';
import { withSessionSsr } from "@lib/withSession";

import { AiOutlineMenu, AiOutlineTags } from "react-icons/ai";
import { BsXLg, BsCart3, BsArrowRight } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
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
            OFFER: <a href="" className="promo-banner__link">Free Shipping Until January 1st!</a>
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

          <div className="header__icons">
            <ul>
              <li className='header__icon-link header__icon-cart'>
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

          <div className="banner__social_buttons">
            <button className="banner__social-icon">
              <RiFacebookBoxFill />
            </button>
            <button className="banner__social-icon">
              <RiInstagramFill />
            </button>
            <button className="banner__social-icon">
              <RiYoutubeFill />
            </button>
            <button className="banner__social-icon">
              <RiTwitterFill />
            </button>
            <button className="banner__social-icon">
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
          <div className="collections__block">
            <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
            <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
            <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
            <Img alt="" layout="responsive" width={0} height={0} src="/assets/images/pup.jpg" />
          </div>
        </div>
      </section>

      <section className="additions">
        <div className="additions__container">
          <div className="additions__col">
            <div className="additions__icon"><AiOutlineTags /></div>
            <h3 className='additions__title'>100% money-back guarantee</h3>
            <p className='additions__text'>We offer a <strong>100% money-back guarantee</strong> for any returns in the 14 days protection.</p>
          </div>
          <div className="additions__col">
            <div className="additions__icon"><TbTruckDelivery /></div>
            <h3 className='additions__title'>free shipping</h3>
            <p className='additions__text'>No matter where you are from, you&apos;ll have <strong>FREE</strong> shipping purchasing in Jones.</p>
          </div>
          <div className="additions__col">
            <div className="additions__icon"><MdSupportAgent /></div>
            <h3 className='additions__title'>online support</h3>
            <p className='additions__text'>Our customer service is <strong>available 24h</strong>.</p>
          </div>
        </div>
      </section>

      <footer className='footer'>
        <div className="footer__container">
          <div className="footer__col">
            <div className="footer__heading"><h3>about</h3></div>
            <ul>
              <li><Link href="/"><a>About Us</a></Link></li>
              <li><Link href="/"><a>Our Mission</a></Link></li>
              <li><Link href="/"><a>Staff</a></Link></li>
            </ul>
            <hr />
            <p><a href="tel:13124786691">Call +1 (312) 478-6691</a></p>
            <p><a href="mailto:support@jones.com?subject=Need%20Support">support@jones.com</a></p>
            <p>46 Lakeshore St. Knoxville, TN 37918</p>
            <div className="footer__social-buttons">
              <button className="banner__social-icon">
                <RiFacebookBoxFill />
              </button>
              <button className="banner__social-icon">
                <RiInstagramFill />
              </button>
              <button className="banner__social-icon">
                <RiYoutubeFill />
              </button>
              <button className="banner__social-icon">
                <RiTwitterFill />
              </button>
              <button className="banner__social-icon">
                <RiPinterestFill />
              </button>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__heading"><h3>support</h3></div>
          </div>
          <div className="footer__col">
            <div className="footer__heading"><h3>categories</h3></div>
          </div>
          <div className="footer__col">
            <div className="newsletter-box">
              <h3 className="newsletter__heading">newsletter</h3>
              <p className="newsletter__heading">Sign up to our newsletter and we&apos;ll keep you up-to-date with the latest arrivals.</p>
              <form action="">
                <div className="newsletter__input">
                  <label><input type="email" name="email" /><span>ENTER EMAIL</span></label>
                  <button type="submit"><BsArrowRight /></button>
                </div>
              </form>
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