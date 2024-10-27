"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import PostCard from "../commons/PostCard";
import {
  getBizOffDays,
  insertBizOffDays,
  deleteBizOffDays,
} from "app/actions/post-actions";
import { useState } from "react";
import DaySkeleton from "../commons/TagsSkeleton";
import DayModal from "./DaysModal";

const allDays = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];

export default function OffDaysCard() {
  const title = "휴무일";
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingDay, setDeletingDay] = useState<string | null>(null);

  const offDaysQuery = useQuery({
    queryKey: ["offDays"],
    queryFn: async () => {
      const offDays = await getBizOffDays();
      return offDays;
    },
  });

  const insertOffDaysMutation = useMutation({
    mutationFn: async (newOffDays: string[]) => {
      if (newOffDays.length > 0) {
        // 요일 선택이 없을 경우 요청 차단
        const result = await insertBizOffDays(newOffDays);
        return result;
      }
    },
    onSuccess: () => {
      offDaysQuery.refetch(); // 새로고침
      setIsModalOpen(false); // 모달 닫기
    },
  });

  const deleteOffDaysMutation = useMutation({
    mutationFn: async (off_day: string) => {
      setDeletingDay(off_day);
      await deleteBizOffDays(off_day);
    },
    onSuccess: () => {
      offDaysQuery.refetch().then((data) => {
        setDeletingDay(null);
        if ((data.data?.length || 0) === 0) {
          setIsDeleteButtonClicked(false);
        }
      });
    },
  });

  const handleAddDays = () => {
    setIsModalOpen(true);
  };

  const handleSaveDays = (selectedDays: string[]) => {
    insertOffDaysMutation.mutate(selectedDays);
  };

  const handleDeleteDay = (off_day: string) => {
    if (isDeleteButtonClicked) {
      deleteOffDaysMutation.mutate(off_day);
    }
  };

  const existingDays = offDaysQuery.data?.map((day) => day.off_day) || [];
  const availableDays = allDays.filter((day) => !existingDays.includes(day));
  const isAllDaysAdded = existingDays.length === allDays.length;
  const isNoDaysAdded = existingDays.length === 0;

  return (
    <PostCard title={title}>
      {offDaysQuery.isLoading ? (
        <DaySkeleton />
      ) : (
        <>
          {/* 요일 리스트 */}
          <div className="flex flex-wrap gap-4 mb-4">
            {isNoDaysAdded ? (
              <p className="text-gray-500 font-semibold">연중무휴</p>
            ) : (
              offDaysQuery.data.map((offDay) => (
                <div
                  key={offDay.id}
                  onClick={() => handleDeleteDay(offDay.off_day)}
                  className={`flex items-center justify-center bg-yellow-200 px-3 py-2 rounded-full shadow-sm text-yellow-900 font-semibold transition duration-300 ${
                    isDeleteButtonClicked
                      ? "cursor-pointer hover:bg-yellow-200"
                      : ""
                  }`}
                >
                  <p className="text-center">{offDay.off_day}</p>
                  {isDeleteButtonClicked && (
                    <span className="ml-2 text-lg font-bold w-4 h-4 flex items-center justify-center">
                      {deletingDay === offDay.off_day ? (
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-blue-500 rounded-full"></span>
                      ) : (
                        "×"
                      )}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>

          {/* 안내 문구 */}
          <div className="mb-4 h-6 flex items-center justify-center">
            {isDeleteButtonClicked ? (
              <p className="text-sm text-red-600 font-medium bg-red-100 px-4 py-1 rounded-md">
                요일을 클릭하시면 삭제됩니다.
              </p>
            ) : (
              <div className="h-6" />
            )}
          </div>

          {/* 버튼 컨테이너 */}
          <div className="flex justify-between">
            {!isDeleteButtonClicked && !isAllDaysAdded && (
              <button
                onClick={handleAddDays}
                className="bg-blue-400 text-white font-medium px-5 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
              >
                추가
              </button>
            )}

            {!isNoDaysAdded && (
              <button
                onClick={() => setIsDeleteButtonClicked(!isDeleteButtonClicked)}
                className="px-5 py-2 rounded-lg shadow-lg font-medium transition-all duration-300 bg-red-600 text-white hover:bg-red-700"
              >
                {isDeleteButtonClicked ? "삭제 완료" : "삭제"}
              </button>
            )}
          </div>

          {/* 모달 */}
          {isModalOpen && (
            <DayModal
              availableDays={availableDays}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveDays}
            />
          )}
        </>
      )}
    </PostCard>
  );
}
