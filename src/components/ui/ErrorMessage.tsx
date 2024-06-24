function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`text-xs px-2  ${
        children ? "text-warning opacity-100" : "opacity-0"
      } h-2 `}
    >
      {children || ""}
    </div>
  );
}

export default ErrorMessage;
