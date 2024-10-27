import { SupabaseClient } from "@supabase/supabase-js";
import { OAuthProvider } from "constants/types/custom";

/** OAuth 로그인 */
export const signInUpWithOAuth = async (
  supabase: SupabaseClient,
  provider: OAuthProvider
) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
        : `${process.env.NEXT_PUBLIC_LOCALHOST_URL}/auth/callback`,
      scopes: "account_email",
    },
  });
  if (error) alert(error.message);
};
