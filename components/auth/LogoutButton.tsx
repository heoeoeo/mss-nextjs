import useSupabase from "hooks/useSupabase";

export default function LogoutButton() {
  const supabase = useSupabase();

  return (
    <button
      className="btn btn-wide bg-black text-white text-lg"
      onClick={async () => {
        await supabase.auth.signOut();
      }}
    >
      로그아웃
    </button>
  );
}
