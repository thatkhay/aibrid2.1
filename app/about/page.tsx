import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div>
      <section className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <div className="space-y-6 text-gray-800 leading-relaxed">
              <p className="text-lg">
                AirBrid Music is a Nigerian beat producer and music creator. In
                2020, he transitioned from a traditional career path to pursue
                music production full-time, crafting beats that resonate across
                Africa and beyond.
              </p>

              <p className="text-lg">
                Since then, he&apos;s been creating, producing, and
                collaborating with artists across Afrobeats, Hip-Hop, and R&B
                genres. His production credits include multiple chart-topping
                singles, collaborations with emerging artists, and recognition
                in Nigeria&apos;s vibrant music scene.
              </p>

              <p className="text-lg">
                AirBrid&apos;s production style draws listeners in with
                infectious rhythms, layered melodies, and rich sonic textures
                that blend contemporary sounds with authentic African
                influences. His beats provide the perfect canvas for artists to
                tell their stories, creating music that moves both the body and
                the soul.
              </p>

              <p className="text-lg">
                He is currently working on his debut beat tape and producing for
                upcoming artists. &quot;I&apos;m crafting beats that really
                speak to the culture and give artists the foundation to create
                something meaningful. I want people to feel the energy and
                emotion in every production.&quot; He aims to produce over 200
                beats to curate the perfect collection that will elevate
                artists&apos; music and connect with audiences worldwide.
              </p>
            </div>

            {/* Image - Right Side */}
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/about-image.jpg" // Replace with your actual image path
                alt="AirBrid Music Producer"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
