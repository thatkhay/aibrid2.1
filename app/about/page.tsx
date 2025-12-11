"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const AboutPage = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-100px" });

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div>
      <section className="w-full bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Left Side */}
            <motion.div
              ref={textRef}
              className="space-y-6 text-gray-200 leading-relaxed"
              initial="hidden"
              animate={isTextInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              <motion.p
                className="text-lg"
                custom={0}
                variants={paragraphVariants}
              >
                AirBrid Music is a Nigerian beat producer and music creator. In
                2020, he transitioned from a traditional career path to pursue
                music production full-time, crafting beats that resonate across
                Africa and beyond.
              </motion.p>

              <motion.p
                className="text-lg"
                custom={1}
                variants={paragraphVariants}
              >
                Since then, he&apos;s been creating, producing, and
                collaborating with artists across Afrobeats, Hip-Hop, and R&B
                genres. His production credits include multiple chart-topping
                singles, collaborations with emerging artists, and recognition
                in Nigeria&apos;s vibrant music scene.
              </motion.p>

              <motion.p
                className="text-lg"
                custom={2}
                variants={paragraphVariants}
              >
                AirBrid&apos;s production style draws listeners in with
                infectious rhythms, layered melodies, and rich sonic textures
                that blend contemporary sounds with authentic African
                influences. His beats provide the perfect canvas for artists to
                tell their stories, creating music that moves both the body and
                the soul.
              </motion.p>

              <motion.p
                className="text-lg"
                custom={3}
                variants={paragraphVariants}
              >
                He is currently working on his debut beat tape and producing for
                upcoming artists. &quot;I&apos;m crafting beats that really
                speak to the culture and give artists the foundation to create
                something meaningful. I want people to feel the energy and
                emotion in every production.&quot; He aims to produce over 200
                beats to curate the perfect collection that will elevate
                artists&apos; music and connect with audiences worldwide.
              </motion.p>
            </motion.div>

            {/* Image - Right Side */}
            <motion.div
              ref={imageRef}
              className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-2xl border border-gray-700"
              initial="hidden"
              animate={isImageInView ? "visible" : "hidden"}
              variants={imageVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/assets/airbrid1.jpeg"
                alt="AirBrid Music Producer"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
