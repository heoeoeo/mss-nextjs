import { TypedSupabaseClient } from "utils/supabase/client";

/** 유저 인증 관련 함수 모아놓은 파일
 * @returns { data, AuthErorr }
 */
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

export async function getUserRole(supabase: TypedSupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user.role;
}
