import Link from "next/link";

type BlackButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
};
export default function BlackButton({
  children,
  onClick,
  href,
}: BlackButtonProps) {
  return (
    <div>
      {href ? (
        <Link
          href={href}
          className="btn bg-black text-white text-md font-semibold"
        >
          {children}
        </Link>
      ) : (
        <button
          className="btn bg-black text-white text-md font-semibold"
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </div>
  );
}
