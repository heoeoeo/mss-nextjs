"use client";

import { ErrorMessage, Field } from "formik";

type AuthInputProps = {
  label: string;
  name: string;
  type: string;
  isPending: boolean;
  required?: boolean;
};
export default function AuthInput({
  label,
  name,
  type,
  isPending,
  required = true,
}: AuthInputProps) {
  const isRequired = required ? "*" : "";
  return (
    <div>
      <div className="flex flex-row">
        <span className="text-red-700 mr-1 text-lg">{isRequired}</span>
        <label htmlFor={name}>{label}</label>
      </div>
      <Field
        name={name}
        id={name}
        type={type}
        placeholder={`${label}을(를) 입력하세요.`}
        className="w-full border p-2 rounded-lg size-12"
        readOnly={isPending}
      />
      <div className="min-h-[20px] mt-1">
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
