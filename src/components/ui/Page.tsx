import { PropsWithChildren } from "react";

interface PageProps {
  fullWidth?: boolean;
  isCenter?: boolean;
}

function Page({ children, fullWidth, isCenter }: PropsWithChildren<PageProps>) {
  return (
    <main
      className={`flex flex-col pt-24 items-center w-full mx-auto ${
        fullWidth
          ? "max-w-none !px-0 !py-0 !pt-24"
          : "max-w-screen-xl px-6 md:px-8"
      } py-8 grow ${
        isCenter ? "justify-center min-h-screen" : "items-stretch"
      }`}
    >
      {children}
    </main>
  );
}

export default Page;
