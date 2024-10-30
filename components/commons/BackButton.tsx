"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <button className="btn" onClick={handleBack}>
        뒤로가기
      </button>
    </div>
  );
}
