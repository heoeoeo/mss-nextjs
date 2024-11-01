import { TypedSupabaseClient } from "utils/supabase/client";

const path = "app/actions/dbs/auth.ts";

export async function getUser(supabase: TypedSupabaseClient) {
  const { data } = await supabase.auth.getUser();

  if (!data) {
    console.error(path, "\nError in getUser: user가 없습니다.");
    return null;
  }

  return data.user;
}

export async function getUserId(supabase: TypedSupabaseClient) {
  const user = await getUser(supabase);
  return user.id;
}

// TODO 사용할지말지모름
export async function getUserRole(supabase: TypedSupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user.role;
}
