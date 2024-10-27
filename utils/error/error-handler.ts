/** 서버 액션 에러처리를 위한 공통 함수 */
export function handleError(error) {
  if (!error) return;
  console.error(error);
  throw new Error(error.message);
}
