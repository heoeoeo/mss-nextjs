import { createServerSupabaseClient } from "utils/supabase/server";
import { SideBar } from "./SideBar";
import PWaitModal from "components/ui/PWaitModal";
import BizApplyForm from "components/ui/BizApplyForm";
import BizMoreForm from "components/ui/BizMoreForm";
import { getUserId } from "app/actions/dbs/auth";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: biz_base_info } = await supabase
    .from("biz_base_info")
    .select("id")
    .eq("id", user.id)
    .limit(1)
    .single();

  const { data: biz_total_infos, error } = await supabase
    .from("biz_total_infos")
    .select("*")
    .eq("id", user.id)
    .limit(1)
    .single();

  const user_id = await getUserId(supabase);
  if (!user_id) return false;

  const { data, error: approval_error } = await supabase
    .from("biz_total_infos")
    .select("approval")
    .eq("id", user_id);

  const isAccept = data[0]?.approval && data[0]?.approval === "승인";
  return (
    <div>
      {!biz_base_info && <BizApplyForm />}
      {biz_base_info && !biz_total_infos && <BizMoreForm />}
      {biz_base_info &&
        biz_total_infos &&
        (isAccept ? (
          <div className="flex">
            {/* 데스크탑 사이드바 */}
            <div className="hidden md:block fixed top-0 left-0 h-full w-[20rem]">
              <SideBar />
            </div>

            {/* 모바일 사이드바 - 이 부분은 따로 구현된 MobileSideBar로 처리 가능 */}
            <div className="md:hidden block">{/* <MobileSideBar /> */}</div>

            {/* 사이드바 옆에 children 영역을 배치 */}
            <div className="ml-0 md:ml-[20rem] w-full md:p-4 py-4 bg-gray-50">
              <div>{children}</div>
              {/* <PWaitModal /> */}
            </div>
          </div>
        ) : (
          <PWaitModal />
        ))}
    </div>
  );
}
