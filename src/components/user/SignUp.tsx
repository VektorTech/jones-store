import { TextField, Button } from "@mui/material";
import { generateUsername } from "friendly-username-generator";

export default function SignUp() {
  // fetch("/api/auth/signup", {
  // 	method:"POST",  headers: {
  // 	'Content-Type': 'application/x-www-form-urlencoded'
  //   }, body: new URLSearchParams({email:"vwect@yre.com", password:"rhyohlEUHufrr34543"})
  // });
  return (
    <form method="POST" action="/api/auth/signup">
      <TextField name="username" label="User" value={generateUsername()} />
      <TextField name="email" label="Email" type={"email"} />
      <TextField name="password" type="password" label="Password" />
      <Button type="submit">Sign Up</Button>
    </form>
  );
}
