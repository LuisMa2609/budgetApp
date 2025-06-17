import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="px-4 py-6 md:py-8 xl:py-9 text-black border-b-2 border-emerald-500">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-22 md:w-38 lg:w-54 h-auto"
          />
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
