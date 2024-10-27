"use client";

import { useQuery } from "@tanstack/react-query";
import WaitModal from "./WaitModal";
import { getApprovalStatus } from "app/actions/auth-actions";

export default function PWaitModal() {
  const userStateQuery = useQuery({
    queryKey: ["userState"],
    queryFn: async () => {
      const userApprovalData = await getApprovalStatus();
      return userApprovalData;
    },
  });

  const isLoading = userStateQuery.isLoading;
  const isAccept =
    userStateQuery.data && userStateQuery.data.approval === "승인";

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading ? (
        <span className="loading loading-dots loading-lg"></span>
      ) : (
        <WaitModal isOpen={!isAccept} />
      )}
    </div>
  );
}

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import WaitModal from "./WaitModal";
// import { getApprovalStatus } from "app/actions/auth-actions";

// export default function PWaitModal() {
//   const userStateQuery = useQuery({
//     queryKey: ["userState"],
//     queryFn: async () => {
//       const userApprovalData = await getApprovalStatus();
//       return userApprovalData;
//     },
//   });

//   const isLoading = userStateQuery.isLoading;
//   const isAccept =
//     userStateQuery.data && userStateQuery.data.approval === "승인";

//   return <div>{!isLoading && <WaitModal isOpen={!isAccept} />}</div>;
// }
