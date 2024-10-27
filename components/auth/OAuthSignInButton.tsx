"use client";

import { SupabaseClient } from "@supabase/supabase-js";
import { OAuthProvider } from "constants/types/custom";
import Image from "next/image";
import { signInUpWithOAuth } from "utils/auth/OAuth";

/** OAuth 로그인, 회원가입 버튼 */
export default function OAuthSignInButton({
  supabase,
  provider,
  imageSrc,
  alt,
}: {
  supabase: SupabaseClient;
  provider: OAuthProvider;
  imageSrc: string;
  alt: string;
}) {
  return (
    <div className="relative w-full h-[60px]">
      {" "}
      {/* 명확한 높이 설정 */}
      <button
        onClick={async () => await signInUpWithOAuth(supabase, provider)}
        className="relative w-full h-full p-0 border-none"
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain" // 이미지를 부모 안에서 비율에 맞게 조절
        />
      </button>
    </div>
  );
}
