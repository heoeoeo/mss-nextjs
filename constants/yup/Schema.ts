import * as yup from "yup";
import { YUP_EMAIL, YUP_PASSWORD, YUP_PASSWORD_CONFIRM } from "./values";

/** 로그인 yup 스키마 */
export const SCHEMA_YUP_SIGN_IN = yup.object({
  email: YUP_EMAIL,
  password: YUP_PASSWORD,
});

/** 회원가입 yup 스키마 */
export const SCHEMA_YUP_SIGN_UP = SCHEMA_YUP_SIGN_IN.shape({
  passwordConfirm: YUP_PASSWORD_CONFIRM,
});
