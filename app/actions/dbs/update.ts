import { SupabaseClient } from "@supabase/supabase-js";
export async function updateBizRole(id: string, supabase: SupabaseClient) {
  const { error } = await supabase
    .from("profiles")
    .update({ role: "biz_done" })
    .eq("id", id);

  if (error) {
    console.error("supabase role update 실패: " + error.message);
    return false;
  }

  return true;
}
