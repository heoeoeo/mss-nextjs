import VerEx from "verbal-expressions";

/**
 * /contants/reg.ts 에서는 프로젝트에 사용되는 정규식을 저장합니다.
 * 정규식은 VerbalExpressions 라이브러리를 사용하여 생성합니다.
 *
 * 상수명을 작성하는 규칙은 다음과 같습니다.
 *
 * - 상수명은 대문자로 작성합니다.
 * - 상수명은 snake_case로 작성합니다.
 * - 상수명은 해당 정규식의 용도를 알 수 있도록 작성합니다.
 * - 상수명은 REG_EX로 시작하도록 작성합니다.
 */

/** 휴대폰 번호 정규식 */
export const REG_EX_PHONE = VerEx()
  .startOfLine()
  .then("010")
  .range("0", "9")
  .repeatPrevious(7, 8)
  .endOfLine();

/** 사업자 등록번호 정규식 */
export const REG_EX_BIZ_NUM = VerEx()
  .startOfLine()
  .range("0", "9")
  .repeatPrevious(10)
  .endOfLine();

/** 날짜 YYYYMMDD 정규식 */
export const REG_EX_DATE_YYYYMMDD = VerEx()
  .startOfLine()
  .then("(19[5-9][0-9]|20[0-2][0-4])") // 연도: 1950~2024
  .then("(0[1-9]|1[0-2])") // 월: 01~12
  .then("(0[1-9]|[12][0-9]|3[01])") // 일: 01~31
  .endOfLine();
