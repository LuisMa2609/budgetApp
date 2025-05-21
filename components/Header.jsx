import Link from "next/link";

const Header = () => {
  return (
    <header className="px-4 py-6 md:py-8 xl:py-9 text-black border-b-2 border-black">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-22 md:w-38 lg:w-54 h-auto"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
