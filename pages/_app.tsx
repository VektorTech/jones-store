import "@Sass/main.scss";

import type { AppProps } from "next/app";

import Layout from "@Components/Layout";
import SEO from "@Components/common/SEO";
import Head from "next/head";
import AdminLayout from "./admin/AdminLayout";

function MyApp({ Component, pageProps, cookies, isAdmin }: AppPropsWithCookies) {
  if (isAdmin) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <SEO />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);

  const req = context.ctx.req;

  return {
    ...appProps,
    isAdmin: req?.url?.startsWith("/admin")
  };
}

interface AppPropsWithCookies extends AppProps {
  isAdmin: boolean;
}

export default MyApp;
