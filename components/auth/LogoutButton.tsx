import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();

  return (
    <button
      className="btn btn-wide text-lg"
      onClick={async () => {
        await supabase.auth.signOut();
      }}
    >
      로그아웃
    </button>
  );
}
