"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { updateBizOpenStatus } from "app/actions/post-actions";
import useOpenStatusQuery from "hooks/useOpenStatusQuery";
import useSupabase from "hooks/useSupabase";

type ShopOpenToggleProps = {
  user_id: string;
};
export default function ShopOpenToggle({ user_id }: ShopOpenToggleProps) {
  const supabase = useSupabase();
  const isOpenQuery = useQuery(useOpenStatusQuery({ supabase, user_id }));
  console.log(isOpenQuery.data.is_open);
  const isOpen = isOpenQuery.data.is_open;

  const updateBizOpenStatusMutation = useMutation({
    mutationFn: async (new_open_status: boolean) => {
      const result = await updateBizOpenStatus(new_open_status);
      console.log("re", result);
    },
    onSuccess: () => {
      console.log("success");
      isOpenQuery.refetch();
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
  async function handleToggleChange() {
    const confirmMessage = isOpen
      ? "영업을 종료하시겠습니까?"
      : "영업을 시작하시겠습니까?";
    if (confirm(confirmMessage)) {
      updateBizOpenStatusMutation.mutate(!isOpen);
      // isOpenQuery.refetch();
    }
  }

  return (
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor="shop-toggle" className="font-semibold text-xl w-20">
        영업{isOpen ? " 중" : " 종료"}
      </label>

      <input
        type="checkbox"
        id="shop-toggle"
        className="toggle"
        checked={isOpen}
        onChange={handleToggleChange}
      />
    </div>
  );
}
