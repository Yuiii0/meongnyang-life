import { PropsWithChildren } from "react";

interface PageProps {
  fullWidth?: boolean;
}

function Page({ children, fullWidth }: PropsWithChildren<PageProps>) {
  return (
    <main
      className={`flex flex-col pt-24 items-stretch w-full ${
        fullWidth ? "max-w-none !px-0 !py-0 !pt-24" : "max-w-screen-xl px-8"
      } py-8 mx-auto grow`}
    >
      {children}
    </main>
  );
}

export default Page;
