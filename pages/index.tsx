import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// import { useEffect } from 'react';

import prisma from '@lib/prisma';

const Home: NextPage = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title></title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/** @ts-ignore */}
        {props.users.map(_ => <p key={_.id}>{_.email + "--" + _.username}</p>)}
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

// use SSG for loading all & SSR to view individual

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const results = await prisma.user.findMany();

  return {
    props: {
      users: results.map(_ => ({..._, createdAt: "", updatedAt: ""}))
    }
  };
};

export default Home;


// pages/admin.tsx

// import { withSessionSsr } from "lib/withSession";

// export const getServerSideProps = withSessionSsr(
//   async function getServerSideProps({ req }) {
//     const user = req.session.user;

//     if (user.admin !== true) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: {
//         user: req.session.user,
//       },
//     };
//   }
// );