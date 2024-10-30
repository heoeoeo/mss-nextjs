import MainCompoCard from "../commons/MainCompoCard";

export default function SumCard() {
  return (
    <MainCompoCard>
      <h2 className="text-xl font-semibold mb-2">광고 성과 요약</h2>
      <div className="flex space-x-8 mt-2">
        <div>
          <p className="text-gray-500">조회수</p>
          <p className="text-2xl font-bold">123</p>
        </div>
        <div>
          <p className="text-gray-500">클릭 수</p>
          <p className="text-2xl font-bold">45</p>
        </div>
      </div>
    </MainCompoCard>
  );
}
