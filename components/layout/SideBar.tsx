"use client";
import LogoutButton from "components/auth/LogoutButton";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SideMenuItem } from "./SideMenuItem";

export function SideBar() {
  const currentPath = usePathname();

  const menuItems = [
    { href: "/", label: "메인" },
    { href: "/post", label: "광고글 관리" },
    { href: "/message", label: "메시지", badge: "120" },
    { href: "/setting", label: "설정" },
    { href: "/cs", label: "고객센터" },
  ];

  return (
    <div className="fixed top-0 left-0 h-full w-[20rem] p-4 shadow-lg bg-white flex flex-col justify-between">
      <div>
        <div className="mb-4 p-4 flex justify-center">
          <div className="relative w-2/3 h-[60px]">
            <Image
              src="/images/logos/logo.png"
              fill
              sizes="33vw"
              alt="로고"
              priority
            />
          </div>
        </div>

        <ul className="menu w-full">
          {menuItems.map((item) => (
            <SideMenuItem
              key={item.href}
              href={item.href}
              currentPath={currentPath}
              badge={item.badge}
            >
              {item.label}
            </SideMenuItem>
          ))}
        </ul>
      </div>
      <div className="mt-auto p-4">
        <LogoutButton />
      </div>
    </div>
  );
}
