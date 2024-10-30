// components/PrivacyPolicySkeleton.js

export default function ArticleSkeleton() {
  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 h-screen">
      {/* 페이지 제목 스켈레톤 */}
      <div className="h-8 bg-gray-300 rounded w-2/3 animate-pulse"></div>

      {/* 본문 스켈레톤 */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
      </div>

      {/* 주요 개인정보 처리 표시 섹션 스켈레톤 */}
      <div className="bg-gray-100 p-6 rounded-lg space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 목차 스켈레톤 */}
      <div className="space-y-3">
        <div className="h-6 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
