"use client";
import {
  Clock,
  Eye,
  Heart,
  Loader2,
  MessageSquare,
  PlayCircle,
  ThumbsUp,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Type definitions
interface SpotifyStats {
  monthlyListeners: number;
  followers: number;
  popularity: number;
}

interface Track {
  id: string;
  name: string;
  popularity: number;
  duration_ms: number;
}

interface YoutubeStats {
  subscribers: number;
  totalViews: number;
  totalVideos: number;
}

interface VideoSnippet {
  title: string;
}

interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

interface VideoItem {
  id: string | { videoId: string };
  snippet?: VideoSnippet;
  statistics?: VideoStatistics;
}

const MusicPage = () => {
  const [artistId] = useState("6eGNSDjuuUepYdy32k1zXS");
  const [channelId] = useState("UChwZqabI-Q4g0lQfL-hU23g");

  // Spotify states
  const [spotifyStats, setSpotifyStats] = useState<SpotifyStats | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [spotifyError, setSpotifyError] = useState<string | null>(null);

  // YouTube states
  const [youtubeStats, setYoutubeStats] = useState<YoutubeStats | null>(null);
  const [topVideos, setTopVideos] = useState<VideoItem[]>([]);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeError, setYoutubeError] = useState<string | null>(null);

  // Refs for scroll animations
  const spotifyRef = useRef(null);
  const youtubeRef = useRef(null);
  const liveVideosRef = useRef(null);

  const isSpotifyInView = useInView(spotifyRef, {
    once: true,
    margin: "-100px",
  });
  const isYoutubeInView = useInView(youtubeRef, {
    once: true,
    margin: "-100px",
  });
  const isLiveVideosInView = useInView(liveVideosRef, {
    once: true,
    margin: "-100px",
  });

  // Fetch Spotify data
  useEffect(() => {
    const fetchSpotifyData = async () => {
      if (!artistId) return;

      setSpotifyLoading(true);
      setSpotifyError(null);

      try {
        const response = await fetch(`/api/spotify/artist/${artistId}`);
        if (!response.ok) throw new Error("Failed to fetch Spotify data");

        const data = await response.json();

        setSpotifyStats({
          monthlyListeners: data.followers?.total || 0,
          followers: data.followers?.total || 0,
          popularity: data.popularity || 0,
        });

        const tracksResponse = await fetch(
          `/api/spotify/artist/${artistId}/top-tracks`
        );
        if (tracksResponse.ok) {
          const tracksData = await tracksResponse.json();
          setTopTracks(tracksData.tracks || []);
        }
      } catch (error) {
        console.error("Spotify API Error:", error);
        setSpotifyError(
          "Unable to load Spotify data. Please check your Artist ID and API configuration."
        );
      } finally {
        setSpotifyLoading(false);
      }
    };

    fetchSpotifyData();
  }, [artistId]);

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
    if (n >= 1000000000) return (n / 1000000000).toFixed(1) + "B";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toString();
  };

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  // Calculate average popularity from top tracks
  const avgTrackPopularity =
    topTracks.length > 0
      ? Math.round(
          topTracks.reduce((sum, track) => sum + track.popularity, 0) /
            topTracks.length
        )
      : 0;

  // Calculate total duration of top tracks
  const totalDuration = topTracks.reduce(
    (sum, track) => sum + track.duration_ms,
    0
  );
  const totalMinutes = Math.round(totalDuration / 60000);

  // Find most popular track
  const mostPopularTrack =
    topTracks.length > 0
      ? topTracks.reduce(
          (max, track) => (track.popularity > max.popularity ? track : max),
          topTracks[0]
        )
      : null;

  const defaultSpotifyStats = [
    {
      icon: Users,
      label: "Followers",
      value: formatNumber(spotifyStats?.followers || 0),
      color: "#1DB954",
    },
    {
      icon: TrendingUp,
      label: "Popularity Score",
      value: `${spotifyStats?.popularity || 0}/100`,
      color: "#1DB954",
    },
    {
      icon: PlayCircle,
      label: "Top Tracks Available",
      value: topTracks.length > 0 ? topTracks.length : "0",
      color: "#1DB954",
    },
    {
      icon: Heart,
      label: "Avg Track Popularity",
      value: `${avgTrackPopularity}/100`,
      color: "#1DB954",
    },
    {
      icon: Clock,
      label: "Total Track Duration",
      value: totalMinutes > 0 ? `${totalMinutes} min` : "0 min",
      color: "#1DB954",
    },
    {
      icon: TrendingUp,
      label: "Top Track Popularity",
      value: mostPopularTrack ? `${mostPopularTrack.popularity}/100` : "N/A",
      color: "#1DB954",
    },
  ];

  const defaultYoutubeStats = [
    {
      icon: Users,
      label: "Subscribers",
      value: formatNumber(youtubeStats?.subscribers || 0),
      color: "#FF0000",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: formatNumber(youtubeStats?.totalViews || 0),
      color: "#FF0000",
    },
    {
      icon: Video,
      label: "Total Videos",
      value: youtubeStats?.totalVideos || 0,
      color: "#FF0000",
    },
    {
      icon: TrendingUp,
      label: "Videos Loaded",
      value: topVideos.length > 0 ? topVideos.length : "0",
      color: "#FF0000",
    },
  ];

  return (
    <div className="w-full bg-[#1a1a1a] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Music Available Everywhere Section */}
        <section className="mb-20" ref={spotifyRef}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={isSpotifyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Music Available Everywhere...
          </motion.h2>

          {spotifyError && (
            <motion.div
              className="mb-8 bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {spotifyError}
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isSpotifyInView ? "visible" : "hidden"}
          >
            {defaultSpotifyStats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={idx}
                  className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 relative border border-gray-700"
                  variants={itemVariants}
                >
                  {spotifyLoading && (
                    <div className="absolute inset-0 bg-[#2a2a2a]/50 flex items-center justify-center rounded-xl">
                      <Loader2 className="w-6 h-6 animate-spin text-[#1DB954]" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent
                      className="w-8 h-8"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isSpotifyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Spotify Embed */}
            <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                <PlayCircle className="w-6 h-6 text-[#1DB954]" />
                Artist Profile
              </h3>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={`https://open.spotify.com/embed/artist/${artistId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Artist Profile"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Top Tracks */}
            <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="w-6 h-6 text-[#1DB954]" />
                Top Tracks
              </h3>
              <div className="space-y-3">
                {spotifyLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[#1DB954]" />
                  </div>
                ) : topTracks.length > 0 ? (
                  topTracks.slice(0, 5).map((track, idx) => (
                    <motion.div
                      key={track.id}
                      className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#333] transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-2xl font-bold text-gray-500 w-8">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-white">
                            {track.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {formatNumber(track.popularity)} popularity
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDuration(track.duration_ms)}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-8">
                    No tracks available
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Music Videos Section */}
        <section className="mb-20" ref={youtubeRef}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={isYoutubeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Music Videos
          </motion.h2>

          {youtubeError && (
            <motion.div
              className="mb-8 bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {youtubeError}
            </motion.div>
          )}

          {/* YouTube Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isYoutubeInView ? "visible" : "hidden"}
          >
            {defaultYoutubeStats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={idx}
                  className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 relative border border-gray-700"
                  variants={itemVariants}
                >
                  {youtubeLoading && (
                    <div className="absolute inset-0 bg-[#2a2a2a]/50 flex items-center justify-center rounded-xl">
                      <Loader2 className="w-6 h-6 animate-spin text-[#FF0000]" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent
                      className="w-8 h-8"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* YouTube Dashboard */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isYoutubeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Featured Video */}
            <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                <Video className="w-6 h-6 text-[#FF0000]" />
                Featured Video
              </h3>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                {topVideos.length > 0 ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      typeof topVideos[0].id === "string"
                        ? topVideos[0].id
                        : topVideos[0].id.videoId
                    }`}
                    title={topVideos[0].snippet?.title || "Featured Video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                ) : (
                  <div className="bg-[#1a1a1a] h-[315px] flex items-center justify-center border border-gray-700 rounded-lg">
                    <p className="text-gray-400">
                      Enter a Channel ID to load videos
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Videos */}
            <div className="bg-[#2a2a2a] rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="w-6 h-6 text-[#FF0000]" />
                Top Videos
              </h3>
              <div className="space-y-3">
                {youtubeLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-[#FF0000]" />
                  </div>
                ) : topVideos.length > 0 ? (
                  topVideos.slice(0, 5).map((video, idx) => (
                    <motion.div
                      key={
                        typeof video.id === "string"
                          ? video.id
                          : video.id.videoId
                      }
                      className="p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#333] transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-500 w-8">
                          {idx + 1}
                        </span>
                        <p className="font-semibold text-white flex-1">
                          {video.snippet?.title || "Untitled Video"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400 ml-11">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>
                            {formatNumber(video.statistics?.viewCount || 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>
                            {formatNumber(video.statistics?.likeCount || 0)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>
                            {formatNumber(video.statistics?.commentCount || 0)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-8">
                    No videos available
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isYoutubeInView ? "visible" : "hidden"}
          >
            {topVideos.slice(0, 3).map((video) => (
              <motion.div
                key={typeof video.id === "string" ? video.id : video.id.videoId}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${
                    typeof video.id === "string" ? video.id : video.id.videoId
                  }`}
                  title={video.snippet?.title || "Music Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Live Videos Section */}
        <section ref={liveVideosRef}>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={isLiveVideosInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Live Videos
          </motion.h2>

          {/* Video Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate={isLiveVideosInView ? "visible" : "hidden"}
          >
            {topVideos.slice(3, 9).length > 0 ? (
              topVideos.slice(3, 9).map((video) => (
                <motion.div
                  key={
                    typeof video.id === "string" ? video.id : video.id.videoId
                  }
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      typeof video.id === "string" ? video.id : video.id.videoId
                    }`}
                    title={video.snippet?.title || "Live Video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-400">
                Enter a Channel ID to load live videos
              </div>
            )}
          </motion.div>

          {/* Watch More Button */}
          {channelId && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={isLiveVideosInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href={`https://www.youtube.com/channel/${channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
              >
                watch more here
              </Link>
            </motion.div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MusicPage;
