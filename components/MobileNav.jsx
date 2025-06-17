"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";

const links = [
  { name: "Inicio", path: "/" },
  { name: "Historial", path: "/history" },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-emerald-500" />
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center justify-start pt-20">
        <div className="mb-16 flex justify-center w-full">
          <Link href="/" className="block">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-80 h-auto mx-auto"
            />
          </Link>
        </div>

        <nav className="flex flex-col items-center gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`${
                link.path === pathname
                  ? "text-blue-400 border-b-2 border-blue-400"
                  : ""
              } text-xl capitalize hover:text-amber-600 transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
