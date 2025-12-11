"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Music = () => {
  const musicRef = useRef(null);
  const videoRef = useRef(null);
  const artistId = "6eGNSDjuuUepYdy32k1zXS";

  const isMusicInView = useInView(musicRef, { once: true, margin: "-100px" });
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="w-full bg-[#1a1a1a] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Music Section */}
        <div className="mb-20" ref={musicRef}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={isMusicInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Music
          </motion.h2>

          {/* Spotify Embed */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isMusicInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Player"
                className="rounded-lg"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Live Video Section */}
        <div ref={videoRef}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={isVideoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Live Video
          </motion.h2>

          {/* Video Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVideoInView ? "visible" : "hidden"}
          >
            {/* Video 1 */}
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_1"
                title="AirBrid Music - Video 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </motion.div>

            {/* Video 2 */}
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_2"
                title="AirBrid Music - Video 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </motion.div>

            {/* Video 3 */}
            <motion.div
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID_3"
                title="AirBrid Music - Video 3"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Subscriber Count */}
          <motion.p
            className="text-center text-lg italic text-gray-300"
            initial={{ opacity: 0 }}
            animate={isVideoInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            over 100,000 subscribers on YouTube
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Music;
