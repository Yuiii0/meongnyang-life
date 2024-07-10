import React, { forwardRef, useId } from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  isBorder?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, isBorder = true, ...props }, ref) => {
    const id = useId();

    return (
      <div>
        {label && id && (
          <label htmlFor={id} className="px-1 font-bold text-gray-800">
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={`mt-2 border w-full text-sm px-2 py-2 h-28 border-gray-300 outline-none resize-none transition rounded-md ${
            error ? "focus:border-red-500" : "focus:border-black"
          } ${isBorder ? "border" : "border-none h-64 pt-4"}`}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

export default TextArea;
