import { TextField, Button } from "@mui/material";

const defaultUserCred = {
  user: "devnuggetsbusinesss@gmail.com",
  pass: "Password101",
};

export default function SignIn() {
  return (
    <form method="POST" action="/api/auth/signin">
      <TextField
        defaultValue={defaultUserCred.user}
        name="email"
        label="Email or User"
      />
      <TextField
        defaultValue={defaultUserCred.pass}
        name="password"
        type="password"
        label="Password"
      />
      <Button type="submit">Sign In</Button>
    </form>
  );
}
