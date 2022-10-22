import SEO from "@Components/common/SEO";
import AuthForm from "@Components/user/AuthForm";

export default function SignUpPage() {
  return (
    <div className="auth-page">
      <SEO title="Sign In" />
      <AuthForm isNewUser={true} />
    </div>
  );
}
