/**
 * 공공데이터포털의 날짜 형식(YYYYMMDD)을 postgres의 Date타입 형식(YYYY-MM-DD)으로 변환
 * @param yyyymmdd - YYYYMMDD 형식의 문자열
 * @returns {string} - YYYY-MM-DD 형식의 문자열
 */
export function formatDateString(yyyymmdd: string): string {
  if (yyyymmdd.length !== 8) {
    throw new Error("인자는 8자리이며 YYYYMMDD 형식입니다.");
  }

  const year = yyyymmdd.slice(0, 4);
  const month = yyyymmdd.slice(4, 6);
  const day = yyyymmdd.slice(6, 8);

  return `${year}-${month}-${day}`;
}
