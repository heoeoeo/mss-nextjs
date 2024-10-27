import { BizBaseInfoInsert } from "constants/types/db";

/** 공공데이터 포털에서 사업자 정보 검증하는 함수 */
export async function validateBizWithAPI(values: BizBaseInfoInsert) {
  const url = `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.NEXT_DATA_SERVICE_KEY}`;
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    businesses: [values],
  });

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    const result = await response.json();
    return result.data[0]?.valid === "01"; // 01: 계속사업자
  } catch (error) {
    throw new Error("사업자정보 확인 실패: " + error.message);
  }
}
