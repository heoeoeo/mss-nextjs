import { SupabaseClient } from "@supabase/supabase-js"; // SupabaseClient 타입 임포트

export async function getUserId(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user.id;
}

export async function getUserRole(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user.role;
}
