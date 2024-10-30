import React from "react";

type WelcomeProps = {
  biz_name: string;
  comment: string;
};
function Welcome({ biz_name, comment }: WelcomeProps) {
  return (
    <div className="flex flex-row mb-6 gap-1 items-end">
      <h1 className="text-3xl font-semibold">{biz_name}</h1>
      <h2 className="text-2xl text-gray-700">{comment}</h2>
    </div>
  );
}

export default React.memo(Welcome);
