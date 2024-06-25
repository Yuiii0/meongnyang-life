import SignUpForm from "@/components/pages/signUp/SignUpForm";
import Heading from "@/components/ui/Heading";
import Page from "@/components/ui/Page";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Page>
        <Heading>회원가입</Heading>
        <SignUpForm />
      </Page>
    </div>
  );
}

export default SignUpPage;
