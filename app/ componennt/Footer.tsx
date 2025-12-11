import React from "react";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#391818] text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Links */}
        <div className="flex justify-center gap-8 text-lg mb-6">
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 text-2xl">
          <Link
            href="https://www.instagram.com/aibridwande/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UChwZqabI-Q4g0lQfL-hU23g"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube />
          </Link>
          <Link
            href="https://open.spotify.com/artist/6eGNSDjuuUepYdy32k1zXS"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="Spotify"
          >
            <FaSpotify />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
