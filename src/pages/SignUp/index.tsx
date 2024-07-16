import SignUpForm from "@/components/pages/signUp/SignUpForm";
import Heading from "@/components/ui/Heading";
import Page from "@/components/ui/Page";

function SignUpPage() {
  return (
    <Page isCenter>
      <Heading>회원가입</Heading>
      <SignUpForm />
    </Page>
  );
}

export default SignUpPage;
