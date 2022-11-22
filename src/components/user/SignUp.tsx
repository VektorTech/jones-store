import type { UserTypeNormalized } from "src/types/shared";

import { useState, useRef } from "react";
import { generateUsername } from "friendly-username-generator";

import TextField from "@Components/formControls/TextField";
import Button from "@Components/formControls/Button";
import Form from "@Components/common/Form";

import { userSchema } from "@Lib/validations";
import { validateInput, validateInputs } from "@Lib/helpers";
import { useAuthState } from "@Lib/contexts/AuthContext";
import { toast } from "react-toastify";

const validateFormField = validateInput(userSchema);

export default function SignUp() {
  const [formErrors, setFormErrors] = useState<formParams>({});
  const generatedName = useRef(generateUsername());

  return (
    <>
      <h2 className="auth__header">Sign Up</h2>
      <Form
        method="POST"
        action="/api/auth/signup"
        beforeSubmit={(params) => {
          const error = validateInputs(params, userSchema);
          if (error) {
            error.inner.forEach((error) => {
              setFormErrors((formErrors) => ({
                ...formErrors,
                [error.path as string]: error.message,
              }));
            });
            return [params, false];
          }
        }}
        afterSubmit={(res) => {
          if (res.success) {
            location.href = location.origin;
          } else {
            toast("Something Went Wrong", { type: "error" });
          }
        }}
      >
        <TextField
          error={formErrors["username"]}
          name="username"
          label="User"
          placeholder="eg., john_brown"
          required
          onBlur={(e) => {
            setFormErrors({
              ...formErrors,
              username: validateFormField("username", e.target.value),
            });
          }}
          value={generatedName.current}
        />
        <TextField
          error={formErrors["email"]}
          name="email"
          label="Email"
          type="email"
          placeholder="example@domain.com"
          required
          onBlur={(e) =>
            setFormErrors({
              ...formErrors,
              email: validateFormField("email", e.target.value),
            })
          }
        />
        <TextField
          error={formErrors["password"]}
          name="password"
          type="password"
          label="Password"
          placeholder="At least 7 characters"
          minLength={7}
          required
          onBlur={(e) =>
            setFormErrors({
              ...formErrors,
              password: validateFormField("password", e.target.value),
            })
          }
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </>
  );
}

interface formParams {
  username?: string;
  email?: string;
  password?: string;
}
