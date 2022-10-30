import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { useState } from "react";

export default function AuthForm({ isNewUser = false }) {
  const [signUp, setSignUp] = useState(isNewUser);

  return (
    <div className="auth">
      <div className={"auth__container " + (signUp ? "auth__container--signup" : "auth__container--signin")}>
        <div className={"auth__form" + (signUp ? " auth__form--active" : "")}>
          <SignUp />
          <button className="auth__button" onClick={() => setSignUp(false)}>
            Already have an account?
          </button>
        </div>

        <div className={"auth__form" + (!signUp ? " auth__form--active" : "")}>
          <SignIn />
          <button className="auth__button" onClick={() => setSignUp(true)}>
            Don&apos;t have an account?
          </button>
        </div>
      </div>
    </div>
  );
}
