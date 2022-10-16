import type { NextApiRequest, NextApiResponse } from "next";
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "./config";

export function setCookie(key: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
}

export function getCookie(key: string) {
  const keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}

export function eraseCookie(key: string) {
  const keyValue = getCookie(key);
  setCookie(key, keyValue || "", -1);
}

type CloudinaryBatchResultType = Promise<
  {
    secure_url?: string;
    url?: string;
    width?: number;
    height?: number;
    original_filename?: string;
    format?: string;
  }[]
>;
export function cloudinaryUpload(files: FileList): CloudinaryBatchResultType {
  const formData = new FormData();
  const results = [].map.call(files, (file) => {
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    return fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .catch();
  });

  return Promise.all(results) as CloudinaryBatchResultType;
}

export const getPathString = (url: string) =>
  url
    .toLowerCase()
    .replace(/[^\sa-zA-Z0-9]/g, "")
    .replace(/\s/g, "-");

export class ServerError extends Error {
	status: number;
	constructor (message: string, status: number) {
		super(message);
		this.name = "ServerError";
		this.status = status;
	}
}

export const catchAsyncErrors = (func: Function) => (req: NextApiRequest, res: NextApiResponse, next: Function) => {
	Promise
		.resolve(func(req, res, next))
		.catch((e) => next(e));
}