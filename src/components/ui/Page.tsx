import { PropsWithChildren } from "react";

interface PageProps {
  fullWidth?: boolean;
}

function Page({ children, fullWidth }: PropsWithChildren<PageProps>) {
  return (
    <main
      className={`flex flex-col items-stretch w-full ${
        fullWidth ? "max-w-none px-0" : "max-w-screen-xl px-8"
      } py-8 mx-auto grow`}
    >
      {children}
    </main>
  );
}

export default Page;
