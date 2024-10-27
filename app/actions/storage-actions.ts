"use server";

import { createServerSupabaseClient } from "utils/supabase/server";
import { getUserId } from "./dbs/auth";
import { upsertBizCert } from "./dbs/insert";

export async function upsertBizCertToStorage(formData: FormData) {
  const biz_cert = formData.get("biz_cert") as File;
  if (!biz_cert) return;

  const supabase = await createServerSupabaseClient();

  const user_id = await getUserId(supabase);
  if (!user_id)
    return { valid: false, message: "로그인 정보를 찾을 수 없습니다." };

  const isUploadedSuccess = await upsertBizCert(user_id, biz_cert, supabase);
  if (!isUploadedSuccess)
    return { valid: false, message: "업로드에 실패했습니다." };

  return { valid: true, message: "업로드 성공" };
}
