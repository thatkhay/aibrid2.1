import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePics = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.jpg" // Replace with your actual image path
          alt="Artist on green couch"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif">
          AirBrid Music
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Discover the sound that moves you
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/music"
            className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            Listen Now
          </Link>
          <Link
            href="/tour"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-black transition-all transform hover:scale-105"
          >
            Tour Dates
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default HomePics;
