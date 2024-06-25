import React from "react";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  if (!children) return null;
  return (
    <p className="px-1 pt-2 text-sm text-start text-warning">{children}</p>
  );
};

export default ErrorMessage;
