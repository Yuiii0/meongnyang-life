import GoogleLogInButton from "@/components/pages/logIn/GoogleLogInButton";
import IntroSwiper from "@/components/pages/logIn/IntroSwiper";
import LogInForm from "@/components/pages/logIn/LogInForm";
import NavigationLink from "@/components/ui/NavigationLink";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";

function LogInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Page>
        <SEOMetaTag
          description="반려동물 사진 공유, 정보 교환, 친구 찾기 등 다양한 기능을 제공하는 반려동물 커뮤니티입니다. 멍냥 생활에서 반려동물과의 소중한 추억을 만들어보세요!"
          keywords="멍냥 생활, 반려동물 커뮤니티, 사진 공유, 일상 교환, 정보 교환, 로그인"
          url="https://dev-meongnyang-life.vercel.app"
        />
        <section className="w-full max-w-md text-center">
          <div className="mb-12">
            <h1 className=" text-xl font-bold -translate-x-0.5">
              🐾 멍냥 생활
            </h1>
            <IntroSwiper />
          </div>
          <LogInForm />
          <GoogleLogInButton />
          <div className="flex items-start justify-between gap-6 mt-6">
            <div className="px-2 text-sm">아직 회원이 아니신가요?</div>
            <NavigationLink to="/signup" isBottom={false}>
              가입하기
            </NavigationLink>
          </div>
        </section>
      </Page>
    </div>
  );
}

export default LogInPage;
