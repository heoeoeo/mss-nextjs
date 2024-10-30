import React from "react";

interface RatingProps {
  score: number;
}

const Rating: React.FC<RatingProps> = ({ score }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const threshold = (i + 1) * 10;
    if (score >= threshold) return "full";
    if (score >= threshold - 5) return "half";
    return "empty";
  });

  return (
    <div className="flex space-x-1">
      <div className="rating rating-lg rating-half">
        {stars.map((star, index) => (
          <div
            key={index}
            className={`w-6 h-6 rounded-full mask mask-star-2 ${
              star === "full"
                ? "bg-MSSColor"
                : star === "half"
                ? "bg-MSSColor opacity-50"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
