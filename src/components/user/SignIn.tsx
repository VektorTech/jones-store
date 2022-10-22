import Form from "@Components/Form";

import TextField from "@Components/common/formControls/TextField";
import Button from "@Components/common/formControls/Button";

const defaultUserCred = {
  user: "devnuggetsbusinesss@gmail.com",
  pass: "Password101",
};

export default function SignIn() {
  return (
    <Form
      method="POST"
      action="/api/auth/signin"
      afterSubmit={(res, status) => {
        console.log(status, res);
        setTimeout(() => (location.href = location.origin), 3000);
      }}
    >
      <h2>Sign In</h2>
      <TextField
        defaultValue={defaultUserCred.user}
        label="Email or User"
      />
      <TextField
        defaultValue={defaultUserCred.pass}
        name="password"
        type="password"
        label="Password"
      />
      <Button type="submit">Sign In</Button>
    </Form>
  );
}
