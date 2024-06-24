function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`text-sm px-1 pt-2 text-start ${
        children ? "text-warning opacity-100" : "opacity-0"
      } h-2 `}
    >
      {children || ""}
    </div>
  );
}

export default ErrorMessage;
