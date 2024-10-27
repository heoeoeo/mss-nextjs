// PostCard.tsx
export default function PostCard({ children, title }) {
  return (
    <div className="flex flex-col items-start border border-gray-200 md:rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <div className="w-full">{children}</div>
    </div>
  );
}
