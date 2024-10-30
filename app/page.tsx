import ShopOpenToggle from "components/main/commons/ShopOpenToggle";
import ReviewCard from "components/main/reviews/ReviewCard";
import Welcome from "components/main/commons/Welcome";
import SumCard from "components/main/posts/\bSumCard";
import CsCard from "components/main/cs/CsCard";
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const user = await supabase.auth.getUser();
  const user_id = user?.data.user.id;

  const { data, error } = await supabase
    .from("biz_posts")
    .select("is_open")
    .eq("user_id", user_id)
    .single();
  console.log(data);
  const isOpen = data.is_open;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Welcome biz_name="맛집" comment="사장님 환영합니다." />
      <ShopOpenToggle initialIsOpen={isOpen} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SumCard />
        <ReviewCard />
        <CsCard />
      </div>
    </div>
  );
}
