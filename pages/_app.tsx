import "@Sass/main.scss";

import App, { AppProps, AppContext } from "next/app";

import Layout from "@Components/Layout";
import SEO from "@Components/common/SEO";
import Head from "next/head";
import AdminLayout from "@Components/AdminLayout";
import { getIronSession, IronSessionData } from "iron-session";
import { NextResponse } from "next/server";
import { sessionOptions } from "@Lib/config";
import { IncomingMessage } from "http";
import { ReactElement } from "react";
import { UserProvider } from "@Lib/contexts/UserContext";
import { UIProvider } from "@Lib/contexts/UIContext";

function MyApp({
  Component,
  pageProps,
  cookies,
  userSession,
  isAdmin,
}: AppPropsWithCookies) {
  let FinalRenderComponent: ReactElement | null = null;

  if (isAdmin) {
    FinalRenderComponent = (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    );
  } else {
    FinalRenderComponent = (
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

  return (
    <UIProvider announcementHidden={cookies?.announcementState == "closed"}>
      <UserProvider userId={userSession?.id}>
        { FinalRenderComponent }
      </UserProvider>
    </UIProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const req = context.ctx.req as IncomingMessage;
  const res = NextResponse.next();

  let session = null;

  if (req) {
    session = await getIronSession(req, res, sessionOptions).catch();
  }

  const cookies = req?.headers.cookie?.split("; ").reduce((batch, cookie) => {
    const [key, value] = cookie.split("=");
    return { ...batch, [key]: value };
  }, {});

  return {
    ...appProps,
    cookies,
    userSession: session?.user,
    isAdmin: req?.url?.startsWith("/admin"),
  };
};

interface AppPropsWithCookies extends AppProps {
  cookies: { announcementState: string };
  isAdmin: boolean;
  userSession: IronSessionData["user"];
}

export default MyApp;
