import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthFrom";

export default function SignInPage() {
  return (
    <>
      <SEO title="Sign In" />
      <AuthForm />
    </>
  );
}
