export default function TagsSkeleton() {
  return (
    <div className="animate-pulse flex flex-row gap-4 p-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="h-6 w-16 bg-gray-300 rounded-md"></div>
      ))}
    </div>
  );
}
