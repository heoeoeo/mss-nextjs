"use client";
import { SupabaseClient } from "@supabase/supabase-js";
import OAuthSignInButton from "./OAuthSignInButton";

export default function OAuthSet({ supabase }: { supabase: SupabaseClient }) {
  return (
    <div className="flex flex-col gap-1 mt-1 w-full min-w-[300px]">
      {" "}
      {/* 고정된 최대 폭과 상하 간격 */}
      <OAuthSignInButton
        supabase={supabase}
        provider="kakao"
        imageSrc="/images/OAuths/kakao_lg.png"
        alt="카카오 로그인"
      />
      <OAuthSignInButton
        supabase={supabase}
        provider="google"
        imageSrc="/images/OAuths/google.svg"
        alt="구글 로그인"
      />
      {/* <OAuthSignInButton
        supabase={supabase}
        provider="apple"
        imageSrc="/images/OAuths/apple.png"
        alt="애플 로그인"
      /> */}
    </div>
  );
}
