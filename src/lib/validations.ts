import { object, string } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const userSchema = object({
  username: string().max(40).required(),
  email: string().email().max(255).required(),
  firstName: string().min(2).max(50),
  lastName: string().min(2).max(50),
  phoneNumber: string().matches(phoneRegExp, "Phone number is not valid"),
  password: string().min(7).required(),
  avatar: string(),
}).required();

export const userLoginSchema = object({
  email: string().max(255).required(),
  password: string().min(7).required(),
}).required();
