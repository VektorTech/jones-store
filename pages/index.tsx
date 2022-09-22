import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
// import { useEffect } from 'react';
import { withSessionSsr } from "@lib/withSession";

import { BsXLg, BsCart3, BsArrowRight } from "react-icons/bs";
import Link from 'next/link';
import Image from 'next/future/image';
import LogoImg from '@images/jones-logo.png';

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


      <button>Hello</button>

      <footer>
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