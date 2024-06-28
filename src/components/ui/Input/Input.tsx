import React, { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const id = useId();

    return (
      <div>
        {label && id && (
          <label htmlFor={id} className="px-1 font-bold text-gray-800">
            {label}
          </label>
        )}
        <input
          id={id}
          className={`mt-2 border w-full px-2 py-2 h-11 text-sm border-gray-300 outline-none transition rounded-md ${
            error ? "focus:border-red-500" : "focus:border-black "
          }`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
