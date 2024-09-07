import NavigationLink from "@/components/ui/NavigationLink";

const SignUpPrompt = () => (
  <div className="flex items-start justify-between gap-6 mt-6">
    <div className="px-2 text-sm">아직 회원이 아니신가요?</div>
    <NavigationLink to="/signup" isBottom={false}>
      가입하기
    </NavigationLink>
  </div>
);

export default SignUpPrompt;
