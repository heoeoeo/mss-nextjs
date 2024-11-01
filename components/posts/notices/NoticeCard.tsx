// Notice.tsx
"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PostCard from "../commons/PostCard";
import { manageBizNotice, getNoticeLogStatus } from "app/actions/post-actions";
import Blank from "../commons/Blank";
import TextSkeleton from "components/commons/TextSkeleton";
import { useState } from "react";
import { queryServerClient } from "utils/react-query/queryServerClient";

export default function Notice() {
  const title = "공지사항";
  const [isEditing, setIsEditing] = useState(false);
  const [contents, setContents] = useState("");
  const [logStatus, setLogStatus] = useState(null);

  const noticeQuery = useQuery({
    queryKey: ["notice"],
    queryFn: async () => {
      const notice = await manageBizNotice();
      if (notice?.notice?.contents !== undefined) {
        setContents(notice.notice.contents);
      }
      return notice;
    },
  });

  const logStatusQuery = useQuery({
    queryKey: ["noticeLogStatus"],
    queryFn: async () => {
      const status = await getNoticeLogStatus();
      setLogStatus(status);
      return status;
    },
  });

  const noticeMutation = useMutation({
    mutationFn: async (newContents?: string) => {
      const result = await manageBizNotice(newContents);
      return result;
    },
    onSuccess: (data) => {
      if (data.notice) {
        setContents(data.notice.contents);
        setIsEditing(false);
        queryServerClient.invalidateQueries(["notice", "noticeLogStatus"]);
        alert("변경 신청이 완료되었습니다.");
      }
    },
  });

  const isNoticeBlank = !noticeQuery.data?.notice && !contents;

  const isEditable = logStatus?.status !== "WAIT";

  return (
    <PostCard title={title}>
      {noticeQuery.isLoading || logStatusQuery.isLoading ? (
        <TextSkeleton />
      ) : isNoticeBlank ? (
        <>
          <Blank title={title} />
          <button
            onClick={() => noticeMutation.mutate()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            작성
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <div className="text-gray-700 leading-relaxed mb-4">
              {contents || "내용이 없습니다."}
            </div>

            {logStatus?.status === "WAIT" && (
              <div className="text-blue-600 text-sm font-medium">
                승인 대기 중
              </div>
            )}

            {isEditing ? (
              <textarea
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            ) : (
              <div className="text-gray-500">
                {/* 현재 상태: {logStatus?.status} */}
                {logStatus?.contents}
              </div>
            )}

            {isEditable && isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={() => noticeMutation.mutate(contents)}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition"
                >
                  저장
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-sm font-medium rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition"
                >
                  취소
                </button>
              </div>
            )}

            {isEditable && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
              >
                수정
              </button>
            )}
          </div>
        </>
      )}
    </PostCard>
  );
}
