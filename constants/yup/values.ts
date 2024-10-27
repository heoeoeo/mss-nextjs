import * as yup from "yup";
import { REG_EX_BIZ_NUM, REG_EX_PHONE } from "../reg";

/**
 * 데이터 유효성 검증하기 위한 yup 스키마 모음
 *
 * - 상수명은 YUP_로 시작하고, 대문자입니다.
 * - 상수명은 검증할 필드명을 대문자로 적습니다.
 * - 공통으로 사용되는 정규식은 constants/reg.ts에 정의합니다.
 */

/** 상호 검증 yup 스키마 */
export const YUP_B_NAME = yup.string().required("업체명을 입력해주세요.");

/** 사업자 등록번호 검증 yup 스키마 */
export const YUP_B_NO = yup
  .string()
  .matches(REG_EX_BIZ_NUM, "사업자 등록번호는 10자리 숫자여야 합니다.")
  .required("사업자 등록번호를 입력해주세요.");

/** 대표자명 검증 yup 스키마 */
export const YUP_P_NM = yup.string().required("대표자명을 입력해주세요.");

/** 개업일 검증 yup 스키마 */
export const YUP_START_DT = yup.string().required("개업일을 입력해주세요.");

/** 사업자등록증 검증 yup 스키마 */
export const YUP_BIZ_CERT = yup
  .mixed()
  .required("사업자등록증을 업로드해주세요.");

/** 시군구 검증 yup 스키마 */
export const YUP_SIGUNGU = yup.string();

/** 시도 검증 yup 스키마 */
export const YUP_SIDO = yup.string();

/** 동(ex:전농동) 검증 yup 스키마 */
export const YUP_BNAME = yup.string();

/** 주소 검증 yup 스키마 */
export const YUP_ADDRESS = yup.string().required("주소를 선택해주세요.");

/** 상세주소 검증 yup 스키마 */
export const YUP_DETAIL_ADDRESS = yup
  .string()
  .required("상세주소를 입력해주세요.");

/** 근처역 검증 yup 스키마 */
export const YUP_NEAR_STATION = yup.string();

/** 휴대폰번호 검증 yup 스키마 */
export const YUP_PHONE = yup
  .string()
  .matches(REG_EX_PHONE, "휴대폰번호는 11자리 숫자여야 합니다.")
  .required("휴대폰번호를 입력해주세요.");

/** 이메일 검증 */
export const YUP_EMAIL = yup
  .string()
  .email("이메일 형식이 아닙니다.")
  .required("이메일을 입력해주세요.");

export const YUP_PASSWORD = yup
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .required("비밀번호를 입력해주세요.");

export const YUP_PASSWORD_CONFIRM = yup
  .string()
  .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
  .required("비밀번호 확인이 필요합니다.");
