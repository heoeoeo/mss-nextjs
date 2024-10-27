import Image from "next/image";

export default function AuthLogo() {
  return (
    <div className="relative w-3/4 h-[80px]">
      <Image
        src={"/images/logos/Logo.png"}
        fill
        sizes="100%"
        alt="마선생 로그인창 로고"
        className="mb-6"
      />
    </div>
  );
}
