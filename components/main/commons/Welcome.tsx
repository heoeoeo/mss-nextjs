"use client";

import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "state/atoms";

type WelcomeProps = {
  biz_name: string;
  comment: string;
};

function Welcome({ biz_name, comment }: WelcomeProps) {
  const { b_nm } = useRecoilValue(userState);

  return (
    <div className="flex flex-row mb-6 gap-1 items-end">
      <h1 className="text-3xl font-semibold">{b_nm}</h1>
      <h2 className="text-2xl text-gray-700">{comment}</h2>
    </div>
  );
}

export default React.memo(Welcome);
