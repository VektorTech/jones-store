import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthForm";

export default function SignUpPage() {
  return (
    <>
      <SEO title="Sign Up" />
      <AuthForm isNewUser={true} />
    </>
  );
}
