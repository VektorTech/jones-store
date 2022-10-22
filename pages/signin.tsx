import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthForm";

export default function SignInPage() {
  return (
    <div className="auth-page">
      <SEO title="Sign In" />
      <AuthForm />
    </div>
  );
}
