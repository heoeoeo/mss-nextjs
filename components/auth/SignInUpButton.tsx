"use client";

import { AuthView } from "constants/types/custom";

type SignInUpButtonProps = {
  view: AuthView;
  isPending: boolean;
};

export default function SignInUpButton({
  view,
  isPending,
}: SignInUpButtonProps) {
  const isViewSignIn = view === "SIGNIN";

  return (
    <button
      type="submit"
      className="btn bg-blue-500 hover:bg-blue-600 text-white text-lg mt-4"
      disabled={isPending}
    >
      {isViewSignIn ? "로그인" : "회원가입"}
    </button>
  );
}
