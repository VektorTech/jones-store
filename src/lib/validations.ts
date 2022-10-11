import { Category } from "@prisma/client";
import { object, string, array, number } from "yup";

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const userSchema = object({
  username: string().max(40).required(),
  email: string().email().max(255).required(),
  firstName: string().min(2).max(50),
  lastName: string().min(2).max(50),
  phoneNumber: string().matches(phoneRegExp, "Phone number is not valid"),
  password: string().min(7).required(),
  avatarURL: string().url(),
}).required();

export const userLoginSchema = object({
  email: string().max(255).required(),
  password: string().min(7).required(),
}).required();

export const productSchema = object({
  id: string().min(3).required(),
  title: string().max(255).required(),
  mediaURLs: array().of(string().url()).min(2).required(),
  price: number().required().positive(),
  discount: number().positive(),
  shippingCost: number().positive(),
  details: string().required(),
  color: string().max(25).required(),
  sizes: array().of(number()).min(1).required(),
  year: number().min(1985).max(new Date().getFullYear()).required(),
  sku: string().max(25).required(),
  stockQty: number().positive().required(),
  type: string().equals(Object.keys(Category)).required(),
}).required();
