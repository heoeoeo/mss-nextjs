import Link from "next/link";

interface MenuItemProps {
  href: string;
  currentPath: string;
  children: React.ReactNode;
  badge?: string;
}

export function SideMenuItem({
  href,
  currentPath,
  children,
  badge,
}: MenuItemProps) {
  const isActive = currentPath === href;

  return (
    <li
      className={`${
        isActive ? "bg-gray-200 text-gray-800" : ""
      } rounded-lg mt-1`}
    >
      <Link
        href={href}
        className="flex justify-between items-center p-3 text-lg text-black hover:bg-gray-100 rounded-lg transition-colors"
      >
        <span>{children}</span>
        {badge && (
          <span className="badge badge-lg bg-gray-300 text-gray-700">
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
}
