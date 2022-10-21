import Form from "@Components/Form";

import TextField from "@Components/common/formControls/TextField";
import Button from "@Components/common/formControls/Button";
import { generateUsername } from "friendly-username-generator";

export default function SignUp() {
  return (
    <Form
      method="POST"
      action="/api/auth/signup"
      afterSubmit={(res, status) => {
        console.log(status, res);
        setTimeout(() => (location.href = location.origin), 3000);
      }}
    >
      <TextField name="username" label="User" value={generateUsername()} />
      <TextField name="email" label="Email" type={"email"} />
      <TextField name="password" type="password" label="Password" />
      <Button type="submit">Sign Up</Button>
    </Form>
  );
}
