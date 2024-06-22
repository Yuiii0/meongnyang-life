import { PropsWithChildren } from "react";

interface ButtonProps {
  color?: "primary" | "gray";
}

function Button({
  color = "primary",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className="w-full px-4 py-2 font-semibold text-white rounded-lg bg-brand-100"
      data-color={color}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
