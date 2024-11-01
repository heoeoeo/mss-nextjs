import { getIsOpenById } from "queries/get-is-open-by-id";
import { TypedSupabaseClient } from "utils/supabase/client";

function useOpenStatusQuery({
  supabase,
  user_id,
}: {
  user_id: string;
  supabase: TypedSupabaseClient;
}) {
  const queryKey = ["isOpen", user_id];

  const queryFn = async () => {
    return getIsOpenById(supabase, user_id).then((result) => result.data);
  };

  return { queryKey, queryFn };
}

export default useOpenStatusQuery;
