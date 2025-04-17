import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center bg-neutral-900 py-8 mt-20 md:mt-16">
      <p className="text-sm text-gray-400">
        Made with ❤️&nbsp;by&nbsp;
        <Link
          href="https://linkedin.com/in/zev2712"
          target="_blank"
          className="hover:text-white transition duration-150"
        >
          Aman
        </Link>
      </p>
    </footer>
  );
}
