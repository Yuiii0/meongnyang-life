function Page({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col items-stretch w-full max-w-screen-xl px-8 py-8 mx-auto grow">
      {children}
    </main>
  );
}

export default Page;
