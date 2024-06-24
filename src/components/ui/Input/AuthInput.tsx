import React, { forwardRef, useId } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, ...props }, ref) => {
    const id = useId();

    return (
      <div className="bg-white rounded-lg ">
        <div className="relative bg-inherit">
          <input
            id={id}
            ref={ref}
            className={`w-full px-2 text-gray-700 placeholder-transparent bg-transparent rounded-lg h-11 peer ring-1 ring-gray-300 focus:ring-gray-700 focus:outline-none ${
              error
                ? "focus:border-red-500 focus:ring-warning"
                : "focus:border-black focus:ring-gray-700"
            }`}
            {...props}
          />
          <label
            htmlFor={id}
            className={`absolute left-0 px-1 mx-1 text-sm transition-all cursor-text -top-3 bg-inherit peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sm ${
              error
                ? "text-warning peer-placeholder-shown:text-warning"
                : "text-gray-800 peer-placeholder-shown:text-gray-700"
            }`}
          >
            {label}
          </label>
        </div>
      </div>
    );
  }
);

export default AuthInput;
