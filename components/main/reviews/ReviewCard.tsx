import BlackButton from "components/commons/BlackButton";
import Rating from "./Rating";
import MainCompoCard from "../commons/MainCompoCard";

export default function ReviewCard() {
  return (
    <MainCompoCard>
      <h2 className="text-xl font-semibold mb-2">리뷰 관리</h2>
      <p className="text-gray-600">현재까지 받은 별점 평균 : 4.5</p>
      <Rating score={17} />
      <div className="mt-4">
        <BlackButton href="/reviews">리뷰 관리</BlackButton>
      </div>
    </MainCompoCard>
  );
}
