"use client";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#242D33] text-white py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* LEFT — NAME/LOGO */}
        <Link href={"/"} onClick={() => setIsOpen(false)}>
          <div className="text-xl font-serif tracking-wide">AirBrid Music</div>
        </Link>

        {/* HAMBURGER ICON (Mobile) - With lighter opacity and hover effect */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl focus:outline-none opacity-70 hover:opacity-100 transition-opacity duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        {/* CENTER — NAV LINKS (Desktop) */}
        <div className="hidden md:flex gap-8 text-lg items-center">
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link href="/music" className="hover:text-gray-300 transition-colors">
            Music
          </Link>
          <Link href="/tour" className="hover:text-gray-300 transition-colors">
            Tour
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">
            Blog
          </Link>

          {/* Active Button (Learn) */}
          <Link
            href="/learn"
            className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
          >
            Learn
          </Link>
        </div>

        {/* RIGHT — ICONS + LOGIN (Desktop) */}
        <div className="hidden md:flex items-center gap-5 text-xl">
          <Link
            href="/login"
            className="text-lg hover:text-gray-300 transition-colors"
          >
            Log In
          </Link>
          <Link
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaYoutube />
          </Link>
          <Link
            href="https://www.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaSpotify />
          </Link>
        </div>
      </nav>

      {/* MOBILE MENU - Animated with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-[#1a2227] text-white overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-6 py-4 space-y-4 flex flex-col items-center text-center"
            >
              <Link
                href="/about"
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/music"
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Music
              </Link>
              <Link
                href="/tour"
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Tour
              </Link>
              <Link
                href="/contact"
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/learn"
                className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Learn
              </Link>

              <hr className="border-gray-600 my-4 w-full" />

              {/* Mobile Social Icons + Login */}
              <Link
                href="/login"
                className="block text-lg hover:text-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Log In
              </Link>
              <div className="flex gap-5 text-2xl pt-2">
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
                >
                  <FaYoutube />
                </Link>
                <Link
                  href="https://www.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors"
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
