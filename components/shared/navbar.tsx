import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center md:py-8 py-4">
      <div className="flex justify-between items-center w-sm md:w-3xl border-2 border-gray-800 md:py-4 py-2 md:px-8 px-4 rounded-full">
        <h2 className="text-xl md:text-2xl font-bold select-none">
          truthlens.
        </h2>
        <div className="flex gap-2 md:gap-8">
          <Link
            href="mailto:zev386@gmail.com"
            className="text-gray-300 hover:text-white cursor-pointer transition duration-150 text-xs md:text-base"
          >
            report an issue
          </Link>
          <Link
            href="https://linkedin.com/in/zev2712"
            target="_blank"
            className="text-gray-300 hover:text-white cursor-pointer transition duration-150 text-xs md:text-base"
          >
            follow me
          </Link>
        </div>
      </div>
    </div>
  );
}
