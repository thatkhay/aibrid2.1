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
import React, { useEffect, useState } from "react";

const MusicPage = () => {
  const [artistId, setArtistId] = useState("6eGNSDjuuUepYdy32k1zXS");
  const [channelId, setChannelId] = useState("");

  // Spotify states
  const [spotifyStats, setSpotifyStats] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [spotifyLoading, setSpotifyLoading] = useState(false);
  const [spotifyError, setSpotifyError] = useState(null);

  // YouTube states
  const [youtubeStats, setYoutubeStats] = useState(null);
  const [topVideos, setTopVideos] = useState([]);
  const [youtubeLoading, setYoutubeLoading] = useState(false);
  const [youtubeError, setYoutubeError] = useState(null);

  // Fetch Spotify data
  useEffect(() => {
    const fetchSpotifyData = async () => {
      if (!artistId) return;

      setSpotifyLoading(true);
      setSpotifyError(null);

      try {
        // Replace with your actual Spotify API endpoint
        const response = await fetch(`/api/spotify/artist/${artistId}`);

        if (!response.ok) throw new Error("Failed to fetch Spotify data");

        const data = await response.json();

        setSpotifyStats({
          monthlyListeners: data.followers?.total || 0,
          followers: data.followers?.total || 0,
          popularity: data.popularity || 0,
        });

        // Fetch top tracks
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
        // Replace with your actual YouTube API endpoint
        const response = await fetch(`/api/youtube/channel/${channelId}`);

        if (!response.ok) throw new Error("Failed to fetch YouTube data");

        const data = await response.json();

        setYoutubeStats({
          subscribers: data.statistics?.subscriberCount || 0,
          totalViews: data.statistics?.viewCount || 0,
          totalVideos: data.statistics?.videoCount || 0,
        });

        // Fetch top videos
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

  // Format large numbers
  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Format duration
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const defaultSpotifyStats = [
    {
      icon: Users,
      label: "Monthly Listeners",
      value: formatNumber(spotifyStats?.monthlyListeners),
      change: "+12%",
    },
    {
      icon: Heart,
      label: "Followers",
      value: formatNumber(spotifyStats?.followers),
      change: "+5%",
    },
    { icon: PlayCircle, label: "Total Plays", value: "N/A", change: "+8%" },
    {
      icon: TrendingUp,
      label: "Popularity",
      value: `${spotifyStats?.popularity || 0}/100`,
      change: "+3",
    },
  ];

  const defaultYoutubeStats = [
    {
      icon: Users,
      label: "Subscribers",
      value: formatNumber(youtubeStats?.subscribers),
      change: "+15%",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: formatNumber(youtubeStats?.totalViews),
      change: "+10%",
    },
    {
      icon: Video,
      label: "Total Videos",
      value: youtubeStats?.totalVideos || 0,
      change: "+5",
    },
    { icon: ThumbsUp, label: "Avg. Likes", value: "N/A", change: "+8%" },
  ];

  return (
    <div className="w-full bg-[#E5E5E5] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Music Available Everywhere Section */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3640] mb-8">
            Music Available Everywhere...
          </h2>

          {spotifyError && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {spotifyError}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {defaultSpotifyStats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 relative"
                >
                  {spotifyLoading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl">
                      <Loader2 className="w-6 h-6 animate-spin text-[#1DB954]" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-8 h-8 text-[#1DB954]" />
                    <span className="text-[#1DB954] text-sm font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#2C3640]">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Spotify Embed */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#2C3640]">
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
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>

            {/* Top Tracks */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#2C3640]">
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
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-2xl font-bold text-gray-400 w-8">
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-semibold text-[#2C3640]">
                            {track.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatNumber(track.popularity)} popularity
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDuration(track.duration_ms)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No tracks available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Info Note */}
        </section>

        {/* Music Videos Section */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3640] mb-8">
            Music Videos
          </h2>

          {/* Channel ID Input */}
          <div className="mb-8 bg-white rounded-lg p-6 shadow-lg">
            <label className="block text-sm font-medium mb-2 text-[#2C3640]">
              YouTube Channel ID
            </label>
            <input
              type="text"
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="Enter YouTube Channel ID"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF0000] transition-colors text-[#2C3640]"
            />
            <p className="mt-2 text-xs text-gray-500">
              Find channel ID in YouTube URL: youtube.com/channel/
              <strong>CHANNEL_ID</strong>
            </p>
          </div>

          {youtubeError && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {youtubeError}
            </div>
          )}

          {/* YouTube Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {defaultYoutubeStats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-105 relative"
                >
                  {youtubeLoading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-xl">
                      <Loader2 className="w-6 h-6 animate-spin text-[#FF0000]" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className="w-8 h-8 text-[#FF0000]" />
                    <span className="text-[#FF0000] text-sm font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#2C3640]">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* YouTube Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Featured Video */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#2C3640]">
                <Video className="w-6 h-6 text-[#FF0000]" />
                Featured Video
              </h3>
              <div className="rounded-lg overflow-hidden shadow-2xl">
                {topVideos.length > 0 ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      topVideos[0].id.videoId || topVideos[0].id
                    }`}
                    title={topVideos[0].snippet?.title || "Featured Video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                ) : (
                  <div className="bg-gray-100 h-[315px] flex items-center justify-center">
                    <p className="text-gray-500">
                      Enter a Channel ID to load videos
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Videos */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#2C3640]">
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
                    <div
                      key={video.id.videoId || video.id}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-gray-400 w-8">
                          {idx + 1}
                        </span>
                        <p className="font-semibold text-[#2C3640] flex-1">
                          {video.snippet?.title || "Untitled Video"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 ml-11">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>
                            {formatNumber(video.statistics?.viewCount)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>
                            {formatNumber(video.statistics?.likeCount)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>
                            {formatNumber(video.statistics?.commentCount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No videos available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-white rounded-lg p-4 shadow-md mb-8">
            <p className="text-sm text-gray-500 text-center">
              📹 Live data from YouTube API. Create API endpoints at
              /api/youtube/channel/[id] to fetch real data.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topVideos.slice(0, 3).map((video, idx) => (
              <div
                key={video.id.videoId || video.id}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${
                    video.id.videoId || video.id
                  }`}
                  title={video.snippet?.title || `Video ${idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full"
                ></iframe>
              </div>
            ))}
          </div>
        </section>

        {/* Live Videos Section */}
        <section>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2C3640] mb-8">
            Live Videos
          </h2>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {topVideos.slice(3, 9).length > 0 ? (
              topVideos.slice(3, 9).map((video, idx) => (
                <div
                  key={video.id.videoId || video.id}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${
                      video.id.videoId || video.id
                    }`}
                    title={video.snippet?.title || `Live Video ${idx + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                  ></iframe>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                Enter a Channel ID to load live videos
              </div>
            )}
          </div>

          {/* Watch More Button */}
          {channelId && (
            <div className="flex justify-start">
              <Link
                href={`https://www.youtube.com/channel/${channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2C3640] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#3a4a56] transition-colors"
              >
                watch more here
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MusicPage;
