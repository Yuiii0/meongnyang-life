import { PropsWithChildren } from "react";

interface PageProps {
  fullWidth?: boolean;
  isCenter?: boolean;
}

function Page({ children, fullWidth, isCenter }: PropsWithChildren<PageProps>) {
  return (
    <main
      className={`flex flex-col pt-24 items-stretch w-full ${
        fullWidth ? "max-w-none !px-0 !py-0 !pt-24" : "max-w-screen-xl px-6"
      } py-8 mx-auto grow ${
        isCenter ? "items-center justify-center min-h-screen" : ""
      }`}
    >
      {children}
    </main>
  );
}

export default Page;
