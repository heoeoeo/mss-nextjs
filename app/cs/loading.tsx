export default function CsLoading() {
  return (
    <div className="p-8 max-w-xl mx-auto h-screen">
      {/* 상단 타이틀 */}
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>

      {/* 설명 텍스트 */}
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6 animate-pulse"></div>

      {/* 알림 박스 */}
      <div className="p-4 bg-gray-100 rounded-lg mb-6">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* 아이콘 섹션 */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
