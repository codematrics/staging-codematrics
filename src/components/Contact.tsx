import { forwardRef } from "react";

interface InputProps {
  label: string;
  error: string | null;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, onBlur, error }, ref) => (
    <div className="relative mb-[20px] w-full">
      <input
        ref={ref}
        placeholder={label}
        className={`w-full p-3 bg-[#e5e7eb1f] text-black border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-white ${
          error ? "border-red-700" : "border-gray-700"
        }`}
        onBlur={onBlur}
        name={label}
      />
      <p className="absolute bottom-[-17px] text-[13px] text-red-700">
        {error}
      </p>
    </div>
  )
);

interface SelectProps {
  label: string;
  options: string[];
  error: string | null;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, onBlur, error }, ref) => (
    <div className="relative mb-[20px] w-full">
      <select
        ref={ref}
        onBlur={onBlur}
        className={`w-full p-3 bg-[#e5e7eb1f] text-black border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white ${
          error ? "border-red-700" : "border-gray-700"
        }`}
        name={label}
      >
        <option value="" disabled className="py-2">
          {label}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option}
            className="bg-white text-black py-2"
          >
            {option}
          </option>
        ))}
      </select>
      <p className="absolute bottom-0">{error}</p>
    </div>
  )
);
