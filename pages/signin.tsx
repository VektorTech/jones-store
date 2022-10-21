import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthForm";
import HeroBanner from "@Components/HeroBanner";

export default function SignInPage() {
  return (
    <>
      <HeroBanner short />
      <SEO title="Sign In" />
      <AuthForm />
    </>
  );
}
