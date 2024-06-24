import React, { forwardRef, useId } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, ...props }, ref) => {
    const id = useId();

    return (
      <div>
        {label && (
          <label htmlFor={id} className="px-1 font-bold text-gray-800">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={`mt-2 border w-full text-sm px-2 py-2 h-24 border-gray-300 outline-none resize-none transition rounded-md ${
            error ? "focus:border-red-500" : "focus:border-black"
          }`}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

export default TextArea;
