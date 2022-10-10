import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  cookieName: "jones/user",
  password: process.env.SECRET_COOKIE_PASSWORD as string,

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const DOMAIN_NAME = "http://localhost:3000";

export const CLOUDINARY_UPLOAD_PRESET = "r1841xex";
export const CLOUDINARY_CLOUD_NAME = "dehtovbpt";
