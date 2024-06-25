import { PropsWithChildren } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "gray";
}

function Button({
  color = "primary",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className="w-full px-4 py-3 font-semibold text-white rounded-lg active:bg-white bg-brand-100 hover:opacity-90 active:border-brand-100 active:border active:text-brand-100"
      data-color={color}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
