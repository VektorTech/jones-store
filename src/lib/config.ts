import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  cookieName: "jones/user",
  password: process.env.SECRET_COOKIE_PASSWORD as string,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
