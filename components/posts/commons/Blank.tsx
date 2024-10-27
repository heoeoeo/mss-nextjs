// Blank.tsx
export default function Blank({ title }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6 text-center bg-gray-50 border border-dashed border-gray-300 rounded-md">
      <p className="text-lg font-medium text-gray-500">
        아직 작성된 {title}이(가) 없습니다.
      </p>
      <p className="text-sm text-gray-400">
        새로운 {title}을(를) 추가해보세요.
      </p>
    </div>
  );
}
