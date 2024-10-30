import Link from "next/link";

type ErrorScreenProps = {
  code: string;
  title: string;
  message: string;
  reset?: () => void;
};

/** 에러페이지 처리를 위한 컴포 */
export default function ErrorScreen({
  code,
  title,
  message,
  reset,
}: ErrorScreenProps) {
  const is404 = code === "404";
  return (
    <div className="flex items-center justify-center min-h-screen  text-gray-900">
      <div className="text-center p-4">
        <h1 className="text-9xl font-extrabold">
          <span className="text-PrimaryColor">{code[0]}</span>
          <span className="text-gray-900">{code[1] + code[2]}</span>
        </h1>
        <p className="text-xl mt-2">{title}</p>
        <p className="text-gray-500 mt-2">{message}</p>
        {is404 ? (
          <Link href="/" className="mt-6 inline-block">
            <button className="btn">메인으로 돌아가기</button>
          </Link>
        ) : (
          <button onClick={() => reset()}>다시 시도하기</button>
        )}
      </div>
    </div>
  );
}
