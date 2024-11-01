import { TypedSupabaseClient } from "utils/supabase/client";

/** 비즈유저의 오픈 상태 가져오는 함수 */
export function getIsOpenById(supabase: TypedSupabaseClient, user_id: string) {
  return supabase
    .from("biz_posts")
    .select("is_open")
    .eq("user_id", user_id)
    .throwOnError()
    .single();
}
