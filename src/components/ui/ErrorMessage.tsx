import React from "react";

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  if (!children) return null;
  return (
    <p className="px-1 pt-1 text-sm text-red-600 text-start">{children}</p>
  );
};

export default ErrorMessage;
