"use client";

import useSupabase from "hooks/useSupabase";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "state/atoms";

export default function AuthProvider({ accessToken, children }) {
  const supabase = useSupabase();
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }

      // 유저가 로그인된 상태인지 확인
      if (session) {
        const user_id = session.user.id;

        // `biz_base_info` 테이블에서 `b_nm` 가져오기
        const { data, error } = await supabase
          .from("biz_base_info")
          .select("b_nm")
          .eq("id", user_id)
          .single();

        if (error) {
          console.error("Error fetching business name:", error);
          return;
        }

        // `b_nm`을 Recoil 상태에 저장
        setUser({ b_nm: data?.b_nm || null });
      } else {
        // 유저가 로그아웃된 경우 `b_nm`을 null로 설정
        setUser({ b_nm: null });
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [accessToken, supabase, router, setUser]);

  return children;
}

// "use client";

// import useSupabase from "hooks/useSupabase";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthProvider({ accessToken, children }) {
//   const supabase = useSupabase();
//   const router = useRouter();

//   useEffect(() => {
//     const {
//       data: { subscription: authListner },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session?.access_token !== accessToken) {
//         router.refresh();
//       }
//     });

//     return () => {
//       authListner.unsubscribe();
//     };
//   }, [accessToken, supabase, router]);

//   return children;
// }
