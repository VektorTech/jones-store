import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthFrom";

export default function SignUpPage() {
  return (
    <>
      <SEO title="Sign Up" />
      <AuthForm isNewUser={true} />
    </>
  );
}
