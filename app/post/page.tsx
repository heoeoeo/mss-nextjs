import NoticeCard from "components/posts/notices/NoticeCard";
import OffDaysCard from "components/posts/off-days/OffDaysCard";

const b_nm = "약손명가";

export default function PostPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-300 pb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          {b_nm} 광고글 관리
        </h1>
        <p className="text-base text-gray-600 mt-3">
          공지사항과 이벤트, 코스명은 관리자{" "}
          <span className="text-blue-600 font-semibold">승인 후</span>{" "}
          게시됩니다. <br />
          관리자 승인 전까지 마선생에서는 기존 정보로 표시됩니다.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <NoticeCard />
        <OffDaysCard />

        {/* 다른 카드들 추가 예정 */}
        {/* <Event />
        <OperatingHours />
        <OffDays />
        <BizTypes />
        <Parkings /> */}
      </div>
    </div>
  );
}
