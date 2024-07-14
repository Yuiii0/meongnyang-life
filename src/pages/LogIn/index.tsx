import IntroSwiper from "@/components/pages/logIn/IntroSwiper";
import LogInForm from "@/components/pages/logIn/LogInForm";
import NavigationLink from "@/components/ui/NavigationLink";
import Page from "@/components/ui/Page";
import GoogleLogInButton from "../../components/pages/logIn/GoogleLogInButton";

function LogInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Page>
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
