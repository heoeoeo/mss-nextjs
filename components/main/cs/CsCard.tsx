import BlackButton from "components/commons/BlackButton";
import MainCompoCard from "../commons/MainCompoCard";

export default function CsCard() {
  return (
    <MainCompoCard>
      <h2 className="text-xl font-semibold mb-2">공지사항 및 업데이트</h2>
      <p className="text-gray-600">
        중요한 플랫폼 공지사항과 새로운 기능을 확인하세요.
      </p>
      <div className="mt-4">
        <BlackButton href="/cs">확인하기</BlackButton>
      </div>
    </MainCompoCard>
  );
}
