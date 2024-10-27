import Link from "next/link";

export default function Footer() {
  const company = "하이보스";
  return (
    <footer className="bg-black text-white py-4 w-full">
      <div className="container mx-auto text-center space-y-2">
        {/* 첫째 줄 */}
        <div className="flex justify-center space-x-6">
          <span className="font-semibold">{company}</span>
          <Link href="/terms" className="hover:underline">
            이용약관
          </Link>
          <Link href="/privacy" className="hover:underline">
            개인정보처리방침
          </Link>
        </div>

        {/* 둘째 줄 */}
        <div className="text-sm">
          &copy; 2024 {company}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
