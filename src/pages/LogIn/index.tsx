import IntroSection from "@/components/pages/logIn/IntroSection";
import LogInSection from "@/components/pages/logIn/LogInSection";
import SignUpPrompt from "@/components/pages/logIn/SignUpPrompt";
import Page from "@/components/ui/Page";
import SEOMetaTag from "@/components/ui/SEOMetaTag";

function LogInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Page>
        <SEOMetaTag
          description="반려동물 사진 공유, 정보 교환, 친구 찾기 등 다양한 기능을 제공하는 반려동물 커뮤니티입니다. 멍냥 생활에서 반려동물과의 소중한 추억을 만들어보세요!"
          keywords="멍냥 생활, 반려동물 커뮤니티, 사진 공유, 일상 교환, 정보 교환, 로그인"
        />
        <section className="w-full max-w-md mx-auto text-center">
          <IntroSection />
          <LogInSection />
          <SignUpPrompt />
        </section>
      </Page>
    </div>
  );
}

export default LogInPage;
