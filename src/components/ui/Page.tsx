import { PropsWithChildren } from "react";

interface PageProps {
  fullWidth?: boolean;
}

function Page({ children, fullWidth }: PropsWithChildren<PageProps>) {
  return (
    <main
      className={`flex flex-col items-stretch w-full max-w-screen-xl mx-auto grow ${
        fullWidth ? "max-w-none" : "px-8 py-8"
      }`}
    >
      {children}
    </main>
  );
}

export default Page;
