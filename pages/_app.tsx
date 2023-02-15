import "@Sass/main.scss";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

import type { IncomingMessage } from "http";
import type { UserType } from "src/types/shared";

import App, { AppProps, AppContext } from "next/app";
import { ReactElement } from "react";
import Router from "next/router";
import Head from "next/head";
import { NextResponse } from "next/server";
import NProgress from "nprogress";
import { getIronSession } from "iron-session";
import { ToastContainer } from "react-toastify";

import Layout from "@Components/layouts/Layout";
import SEO from "@Components/common/SEO";
import AdminLayout from "@Components/layouts/AdminLayout";
import ErrorBoundary from "@Components/ErrorBoundary";

import prisma from "@Lib/prisma";
import { sessionOptions } from "@Lib/config";
import { AuthProvider } from "@Contexts/AuthContext";
import { UIProvider } from "@Contexts/UIContext";

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
    <>
      <UIProvider announcementHidden={cookies?.announcementState == "closed"}>
        <AuthProvider currentUser={user}>{FinalRenderComponent}</AuthProvider>
      </UIProvider>
      <ToastContainer position="bottom-right" hideProgressBar />
    </>
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
          wishlist: {
            include: { product: true },
          },
          cart: true,
        },
        where: { id: session.user.id },
      });
      if (user && user.cart) {
        cart = await prisma.cartItem.findMany({
          where: { cartId: user.cart.id },
          include: { product: true },
        });
      }
      user = { ...user, cart };
    } else if (session.guest) {
      const wishlist = await Promise.all(
        session.guest.wishlist.map(async (item) => {
          return {
            ...item,
            product: await prisma.product.findUnique({
              where: { id: item.productId },
            }),
          };
        })
      );
      const cart = await Promise.all(
        session.guest.cart.map(async (item) => {
          return {
            ...item,
            product: await prisma.product.findUnique({
              where: { id: item.productId },
            }),
          };
        })
      );
      user = { ...session.guest, wishlist, cart };
    } else {
      session.guest = {
        id: "guest",
        cart: [],
        wishlist: [],
      };
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
