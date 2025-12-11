"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // FUNCTION FOR ACTIVE BORDER
  const linkClass = (path: string) =>
    pathname === path
      ? "border-b-2 border-white pb-1 text-white"
      : "border-b-2 border-transparent pb-1 hover:border-white transition";

  return (
    <header className="w-full bg-[#391818] text-white py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* LEFT — NAME/LOGO */}
        <Link href={"/"} onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
              <Image
                src="/assets/airbrid1.jpeg"
                alt="AirBrid Music Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-xl font-serif tracking-wide">
              AirBrid Music
            </div>
          </div>
        </Link>

        {/* HAMBURGER ICON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none opacity-70 hover:opacity-100 transition-opacity duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* CENTER — NAV LINKS (Desktop) */}
        <div className="hidden md:flex gap-8 text-lg items-center">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/about" className={linkClass("/about")}>
            About
          </Link>

          <Link href="/music" className={linkClass("/music")}>
            Music
          </Link>

          <Link href="/tour" className={linkClass("/tour")}>
            Tour
          </Link>

          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>

          {/* <Link href="/blog" className={linkClass("/blog")}>
            Blog
          </Link> */}

          {/* Learn stays as the active button style */}
          {/* <Link
            href="/learn"
            className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
          >
            Learn
          </Link> */}
        </div>

        {/* RIGHT — ICONS + LOGIN (Desktop) */}
        <div className="hidden md:flex items-center gap-5 text-xl">
          {/* <Link href="/login" className={linkClass("/login")}>
            Log In
          </Link> */}

          <Link
            href="https://www.instagram.com/aibridwande/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaInstagram />
          </Link>

          <Link
            href="https://www.youtube.com/channel/UChwZqabI-Q4g0lQfL-hU23g"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaYoutube />
          </Link>

          <Link
            href="https://open.spotify.com/artist/6eGNSDjuuUepYdy32k1zXS"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaSpotify />
          </Link>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#391818] text-white overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-6 py-4 space-y-4 flex flex-col items-center text-center"
            >
              <Link
                href="/"
                className={linkClass("/")}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/about"
                className={linkClass("/about")}
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              <Link
                href="/music"
                className={linkClass("/music")}
                onClick={() => setIsOpen(false)}
              >
                Music
              </Link>

              <Link
                href="/tour"
                className={linkClass("/tour")}
                onClick={() => setIsOpen(false)}
              >
                Tour
              </Link>

              <Link
                href="/contact"
                className={linkClass("/contact")}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* <Link
                href="/blog"
                className={linkClass("/blog")}
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link> */}

              {/* <Link
                href="/learn"
                className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Learn
              </Link> */}

              <hr className="border-gray-600 my-4 w-full" />

              {/* <Link
                href="/login"
                className={linkClass("/login")}
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link> */}

              <div className="flex gap-5 text-2xl pt-2">
                <Link
                  href="https://www.instagram.com/aibridwande/"
                  target="_blank"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UChwZqabI-Q4g0lQfL-hU23g"
                  target="_blank"
                >
                  <FaYoutube />
                </Link>
                <Link
                  href="https://open.spotify.com/artist/6eGNSDjuuUepYdy32k1zXS"
                  target="_blank"
                >
                  <FaSpotify />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
