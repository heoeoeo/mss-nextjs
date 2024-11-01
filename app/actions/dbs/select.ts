import { SupabaseClient } from "@supabase/supabase-js";
import { ActionsResponseType } from "constants/types/custom";

/** 사업자등록번호를 받아서 이미 biz_base_info에 데이터가 있는지 확인하는 함수
 * @returns {boolean} - 이미 등록된 사업자이면 true, 아니면 false
 */
export async function isBizRegistered(supabase: SupabaseClient, b_no: string) {
  const { data } = await supabase
    .from("biz_base_info")
    .select("*", { count: "exact" })
    .eq("b_no", b_no)
    .throwOnError();

  return data.length !== 0;
}

/** 스토리지에 있는 파일 signedUrl 가져오는 함수*/
export async function getSignedUrl(supabase: SupabaseClient, user_id: string) {
  const {
    data: { signedUrl },
    error,
  } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET)
    .createSignedUrl(`licenses/${user_id}`, 60);

  if (error || !signedUrl) {
    console.error("supabase signedUrl 실패: " + error.message);
    return false;
  }
  return true;
}

/** 공지사항 가져오는 함수 */
export async function getPostNoticeFromSupabase(
  supabase: SupabaseClient,
  id: string
): Promise<ActionsResponseType> {
  const message = {
    error: "유저 공지사항 가져오기 실패",
    success: "유저 공지사항 가져오기 성공",
  };
  const { data, error } = await supabase
    .schema("public")
    .from("biz_post_notices")
    .select("*")
    .eq("user_id", id);
  console.log("asd: ", data);
  if (error) {
    console.error("유저 공지 가져오기에러", error.message);
    return { valid: false, data: null, error: error, message: message.error };
  }
  const result = data ? data : [];
  return { valid: true, data: result, error: null, message: message.success };
}
