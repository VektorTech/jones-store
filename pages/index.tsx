import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// import { useEffect } from 'react';

import prisma from '@lib/prisma';

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

      <a href="http://facebook.com" className="">Jimmy</a>

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