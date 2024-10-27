import { SupabaseClient } from "@supabase/supabase-js";
import { BizBaseInfoInsert, BizTotalInfosInsert } from "constants/types/db";
import { formatDateString } from "utils/format/date-format";

/** biz_base_info에 데이터 삽입하는 함수 (isBizRegistered 함수에서 데이터가 있으면(true) 사용 ) */
export async function insertBizInfo(
  values: BizBaseInfoInsert,
  supabase: SupabaseClient
) {
  const formattedDate = formatDateString(values.start_dt);
  const { error } = await supabase
    .from("biz_base_info")
    .insert([{ ...values, start_dt: formattedDate }]);

  if (error) {
    console.error("supabase insert 실패: " + error.message);
    return false;
  }

  return true;
}

/** biz_total_infos에 데이터 삽입하는 함수 */
export async function insertBizTotalInfo(
  bizTotalInfo: BizTotalInfosInsert,
  supabase: SupabaseClient
) {
  const { error } = await supabase
    .from("biz_total_infos")
    .insert([bizTotalInfo]);

  if (error) {
    console.error("s1upabase insert 실패: " + error.message);
    return false;
  }

  return true;
}

/** 스토리지에 사업자등록증 업로드하는 함수 */
export async function upsertBizCert(
  user_id: string,
  biz_cert: File,
  supabase: SupabaseClient
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
