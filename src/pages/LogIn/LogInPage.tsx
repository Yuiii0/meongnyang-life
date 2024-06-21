import LogInForm from "@/components/pages/logIn/LogInForm";
import GoogleLogInButton from './GoogleLogInButton';
import NavigationLink from '@/components/ui/NavigationLink';

function LogInPage() {
  return (
    <div>
      <h1>🐾 멍냥 생활</h1>
      <LogInForm />
      <GoogleLogInButton />
      <NavigationLink to="/signup">가입하기</NavigationLink>
      <NavigationLink to="/find/pw">비밀번호 재설정</NavigationLink>
    </div>
  );
}

export default LogInPage;
