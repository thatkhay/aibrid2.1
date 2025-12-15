"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface YoutubeStats {
  subscribers: number;
  totalViews: number;
  totalVideos: number;
}

interface VideoSnippet {
  title: string;
}

interface VideoItem {
  id: string | { videoId: string };
  snippet?: VideoSnippet;
}

const Music = () => {
  const musicRef = useRef(null);
  const videoRef = useRef(null);
  const artistId = "6eGNSDjuuUepYdy32k1zXS";
  const channelId = "UChwZqabI-Q4g0lQfL-hU23g"; // Replace with your YouTube channel ID

  const [youtubeStats, setYoutubeStats] = useState<YoutubeStats | null>(null);
  const [topVideos, setTopVideos] = useState<VideoItem[]>([]);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeError, setYoutubeError] = useState<string | null>(null);

  const isMusicInView = useInView(musicRef, { once: true, margin: "-100px" });
  const isVideoInView = useInView(videoRef, { once: true, margin: "-100px" });

  // Fetch YouTube data
  useEffect(() => {
    const fetchYoutubeData = async () => {
      if (!channelId) return;

      setYoutubeLoading(true);
      setYoutubeError(null);

      try {
        const response = await fetch(`/api/youtube/channel/${channelId}`);
        if (!response.ok) throw new Error("Failed to fetch YouTube data");

        const data = await response.json();

        setYoutubeStats({
          subscribers: data.statistics?.subscriberCount || 0,
          totalViews: data.statistics?.viewCount || 0,
          totalVideos: data.statistics?.videoCount || 0,
        });

        const videosResponse = await fetch(
          `/api/youtube/channel/${channelId}/videos`
        );
        if (videosResponse.ok) {
          const videosData = await videosResponse.json();
          setTopVideos(videosData.items || []);
        }
      } catch (error) {
        console.error("YouTube API Error:", error);
        setYoutubeError(
          "Unable to load YouTube data. Please check your Channel ID and API configuration."
        );
      } finally {
        setYoutubeLoading(false);
      }
    };

    fetchYoutubeData();
  }, [channelId]);

  const formatNumber = (num: number | string): string => {
    const n = typeof num === "string" ? parseInt(num) : num;
    if (!n) return "0";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

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

          {/* Error Message */}
          {youtubeError && (
            <motion.div
              className="mb-8 bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {youtubeError}
            </motion.div>
          )}

          {/* Video Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isVideoInView ? "visible" : "hidden"}
          >
            {youtubeLoading ? (
              <div className="col-span-3 flex items-center justify-center py-16">
                <Loader2 className="w-12 h-12 animate-spin text-white" />
              </div>
            ) : topVideos.length > 0 ? (
              topVideos.slice(0, 3).map((video, idx) => (
                <motion.div
                  key={
                    typeof video.id === "string" ? video.id : video.id.videoId
                  }
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      typeof video.id === "string" ? video.id : video.id.videoId
                    }`}
                    title={
                      video.snippet?.title || `AirBrid Music - Video ${idx + 1}`
                    }
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-16 text-gray-400">
                <p>No videos available at the moment</p>
              </div>
            )}
          </motion.div>

          {/* Subscriber Count */}
          <motion.p
            className="text-center text-lg italic text-gray-300"
            initial={{ opacity: 0 }}
            animate={isVideoInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {youtubeStats
              ? `over ${formatNumber(
                  youtubeStats.subscribers
                )} subscribers on YouTube`
              : "loading subscriber count..."}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default Music;
