"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Historial",
    path: "/history",
  },
  //  {
  //   name: "AddFormView",
  //   path: "/addformview",
  // }
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="px-6 md:px-12 lg:px-20"> 
      <nav className="flex gap-8">
        {links.map((link, index) => (
          <Link key={index} href={link.path} className={`${ link.path === pathname ? "text-blue-400 border-b-2 border-blue-400" : "" } capitalize font-medium hover:text-amber-600 transition-all`}>
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Nav;
