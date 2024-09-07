import SignUpForm from "@/components/pages/signUp/SignUpForm";
import Heading from "@/components/ui/Heading";
import Page from "@/components/ui/Page";
import SEOMetaTag, { BASE_URL } from "@/components/ui/SEOMetaTag";

function SignUpPage() {
  return (
    <Page isCenter>
      <SEOMetaTag
        description="멍냥 생활에 가입하여 반려동물 커뮤니티에 참여하고 다양한 추억을 만들어보세요."
        keywords="회원가입, 멍냥 생활, 반려동물 커뮤니티"
        url={`${BASE_URL}/signup`}
      />
      <section className="flex flex-col justify-center w-full max-w-md">
        <Heading>회원가입</Heading>
        <SignUpForm />
      </section>
    </Page>
  );
}

export default SignUpPage;
