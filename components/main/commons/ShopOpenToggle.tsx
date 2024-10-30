"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { updateBizOpenStatus } from "app/actions/post-actions";
import { useState } from "react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

type ShopOpenToggleProps = {
  initialIsOpen: boolean;
};
export default function ShopOpenToggle({ initialIsOpen }: ShopOpenToggleProps) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const openStatusQuery = useQuery({
    queryKey: ["openStatus"],
    queryFn: async () => {},
  });

  const updateBizOpenStatusMutation = useMutation({
    mutationFn: async (new_open_status: boolean) => {
      const result = await updateBizOpenStatus(new_open_status);
      console.log(result);
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
  async function handleToggleChange() {
    const supabase = await createBrowserSupabaseClient();

    const confirmMessage = isOpen
      ? "영업을 종료하시겠습니까?"
      : "영업을 시작하시겠습니까?";
    if (confirm(confirmMessage)) {
      updateBizOpenStatusMutation.mutate(!isOpen);
      setIsOpen(!isOpen);
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
