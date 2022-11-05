import "@Sass/main.scss";
import "nprogress/nprogress.css";

import App, { AppProps, AppContext } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";

import Layout from "@Components/Layout";
import SEO from "@Components/common/SEO";
import Head from "next/head";
import AdminLayout from "@Components/AdminLayout";
import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";
import { sessionOptions } from "@Lib/config";
import { IncomingMessage } from "http";
import { ReactElement } from "react";
import { AuthProvider } from "@Lib/contexts/AuthContext";
import { UIProvider } from "@Lib/contexts/UIContext";
import prisma from "@Lib/prisma";
import { UserType } from "src/types/shared";
import ErrorBoundary from "@Components/ErrorBoundary";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({
  Component,
  pageProps,
  cookies,
  isAdmin,
  user,
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
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <SEO />
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </>
    );
  }

  return (
    <UIProvider announcementHidden={cookies?.announcementState == "closed"}>
      <AuthProvider currentUser={user}>{FinalRenderComponent}</AuthProvider>
    </UIProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context);
  const req = context.ctx.req as IncomingMessage;
  const res = NextResponse.next();

  let session = null;
  let user = null;
  let cart = null;

  if (req) {
    session = await getIronSession(req, res, sessionOptions).catch();

    if (session.user) {
      user = await prisma.user.findUnique({
        select: {
          id: true,
          username: true,
          wishlist: true,
          cart: true,
        },
        where: { id: session.user.id },
      });
      if (user && user.cart) {
        cart = await prisma.cartItem.findMany({
          where: { cartId: user.cart.id },
        });
      }
      user = { ...user, cart };
    } else if (session.guest) {
      user = session.guest;
    } else {
      session.guest = {
        id: "guest",
        cart: [],
        wishlist: [],
      };
      await session.save();
      user = session.guest;
    }
  }

  const cookies = req?.headers.cookie?.split("; ").reduce((batch, cookie) => {
    const [key, value] = cookie.split("=");
    return { ...batch, [key]: value };
  }, {});

  return {
    ...appProps,
    cookies,
    isAdmin: req?.url?.startsWith("/admin"),
    user,
  };
};

interface AppPropsWithCookies extends AppProps {
  cookies: { announcementState: string };
  isAdmin: boolean;
  user: UserType;
}

export default MyApp;
