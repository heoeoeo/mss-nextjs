export default function BizApplyStep({ stage }: { stage: number }) {
  const isFirstStage = stage === 1;
  const isSecondStage = stage >= 2;
  const isThirdStage = stage === 3;

  return (
    <ul className="steps space-x-3 text-gray-700 text-sm">
      <li
        className={`step step-neutral ${isFirstStage && "text-black text-lg"}`}
      >
        기본 인증
      </li>
      <li
        className={`step ${isSecondStage && "step-neutral"} ${
          stage === 2 && "text-black text-lg"
        }`}
      >
        추가 인증
      </li>
      <li
        className={`step ${isThirdStage && "step-neutral text-black text-lg"}`}
      >
        완료
      </li>
    </ul>
  );
}
