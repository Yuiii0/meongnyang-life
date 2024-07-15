import { PATHS } from "@/pages/route";
import { PropsWithChildren } from "react";
import NavigationLink from "./NavigationLink";

interface SuccessProps {
  linkText?: string;
  imageName?: string;
  text?: string;
}

function Success({
  children,
  linkText,
  imageName = "family.webp",
  text,
}: PropsWithChildren<SuccessProps>) {
  return (
    <div className="text-center ">
      <div className="fixed flex flex-col transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 gap-y-5">
        <div className="w-[300px] h-[300px]  bg-orange-100 rounded-full flex items-center justify-center">
          <img
            src={`/images/${imageName}`}
            alt="dogs_family"
            width={220}
            height={220}
            className="items-center justify-center mx-auto"
          />
        </div>
        <div className="text-lg text-gray-400">{text}</div>
        <div className="text-4xl font-bold">{children}</div>
      </div>
      <NavigationLink to={PATHS.main}>{linkText}</NavigationLink>
    </div>
  );
}

export default Success;
