import { SupabaseClient } from "@supabase/supabase-js";
import { BizBaseInfoInsert, BizTotalInfosInsert } from "constants/types/db";
import { formatDateString } from "utils/format/date-format";

/** biz_base_info에 데이터 삽입하는 함수 성공하면 true 반환*/
export async function insertBizInfo(
  values: BizBaseInfoInsert,
  supabase: SupabaseClient
) {
  const formattedDate = formatDateString(values.start_dt);
  await supabase
    .from("biz_base_info")
    .insert([{ ...values, start_dt: formattedDate }])
    .throwOnError();

  return true;
}

/** biz_total_infos에 데이터 삽입하는 함수 성공하면 true*/
export async function insertBizTotalInfo(
  bizTotalInfo: BizTotalInfosInsert,
  supabase: SupabaseClient
) {
  await supabase.from("biz_total_infos").insert([bizTotalInfo]).throwOnError();

  return true;
}

/** 스토리지에 사업자등록증 업로드하는 함수
 * @todo 에러처리
 */
export async function upsertBizCert(
  supabase: SupabaseClient,
  user_id: string,
  biz_cert: File
) {
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET)
    .upload(`licenses/${user_id}`, biz_cert, { upsert: true });

  if (error) {
    console.error(error);
    return false;
  }
  console.log(data);
  return true;
}
