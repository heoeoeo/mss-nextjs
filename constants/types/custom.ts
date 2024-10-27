import { Dispatch, SetStateAction } from "react";

/** OAuth Provider 타입 */
export type OAuthProvider = "kakao" | "google" | "apple";

/** 로그인, 회원가입에 사용될 이메일, 비밀번호 타입 */
export type AuthForm = { email: string; password: string };

/** 초기화면 */
export type AuthView = "SIGNIN" | "SIGNUP";

/** signin, signup에서 받는 props */
export type AuthViewProps = {
  view: AuthView;
  setView: Dispatch<SetStateAction<AuthView>>;
};

export type ActionsResponseType = {
  valid: boolean;
  data: any[] | null;
  error: any | null;
  message: string | null;
};
