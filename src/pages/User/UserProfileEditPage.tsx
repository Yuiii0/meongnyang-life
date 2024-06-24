import OptionalProfileForm from "@/components/pages/user/profiles/OptionalProfileForm";
import RequiredProfileForm from "@/components/pages/user/profiles/RequiredProfileForm";
import NextButton from "@/components/ui/Button/NextButton";
import PrevButton from "@/components/ui/Button/PrevButton";
import Page from "@/components/ui/Page";
import Success from "@/components/ui/Success";
import { useState } from "react";

function UserProfileEditPage() {
  const [step, setStep] = useState(1);
  const handleClickPrevStep = () => {
    setStep((prev) => prev - 1);
  };
  const handleClickNextStep = () => {
    setStep((prev) => prev + 1);
  };
  return (
    <Page>
      {step == 1 && (
        <>
          <RequiredProfileForm handleClickNextStep={handleClickNextStep} />
        </>
      )}
      {step == 2 && (
        <>
          <OptionalProfileForm />
          <PrevButton onClick={handleClickPrevStep} />
          <NextButton onClick={handleClickNextStep} />
        </>
      )}
      {step == 3 && (
        <div className="fixed flex flex-col items-center justify-center gap-y-8 ">
          <Success linkText="멍냥생활 이용하기" text="멍냥생활 회원이 되신것을">
            환영합니다
          </Success>
        </div>
      )}
    </Page>
  );
}

export default UserProfileEditPage;
