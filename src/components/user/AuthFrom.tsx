import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthForm({ isNewUser = false }) {
  return <div>{isNewUser ? <SignUp /> : <SignIn />}</div>;
}
