import { useMemo } from "react";
import { getSupabaseBrowserClient } from "utils/supabase/client";

/** 클라이언트사이드에서 supabase를 사용하기 위한 훅
 * const supabase = useSupabase() 형태로 사용
 * @returns supabase 클라이언트
 *
 */
function useSupabase() {
  return useMemo(getSupabaseBrowserClient, []);
}

export default useSupabase;
