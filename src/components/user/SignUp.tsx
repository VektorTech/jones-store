import { useState, useRef } from "react";
import { generateUsername } from "friendly-username-generator";

import TextField from "@Components/common/formControls/TextField";
import Button from "@Components/common/formControls/Button";
import Form from "@Components/Form";
import { userSchema } from "@Lib/validations";
import { validateInput, validateInputs } from "@Lib/helpers";

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
        afterSubmit={() => {
          location.href = location.origin;
        }}
      >
        <TextField
          error={formErrors["username"]}
          name="username"
          label="User"
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
