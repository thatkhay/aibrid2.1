// app/api/youtube/channel/[id]/videos/route.ts
import { NextRequest, NextResponse } from "next/server";

// Type definitions for YouTube API responses
interface VideoId {
  videoId: string;
}

interface VideoSnippet {
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
}

interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

interface SearchResultItem {
  id: VideoId;
  snippet: VideoSnippet;
}

interface VideoWithStats extends SearchResultItem {
  statistics: VideoStatistics;
}

interface StatItem {
  id: string;
  statistics: VideoStatistics;
}

interface SearchResponse {
  items: SearchResultItem[];
}

interface StatsResponse {
  items: StatItem[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: channelId } = await params;

    if (!channelId) {
      return NextResponse.json(
        { error: "Channel ID is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "YouTube API key not configured",
          message: "Please set YOUTUBE_API_KEY in your environment variables",
        },
        { status: 500 }
      );
    }

    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json().catch(() => ({}));
      console.error(
        "YouTube search API error:",
        searchResponse.status,
        errorData
      );

      return NextResponse.json(
        {
          error: "Failed to fetch YouTube videos",
          details: errorData,
        },
        { status: searchResponse.status }
      );
    }

    const searchData: SearchResponse = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return NextResponse.json(
        {
          items: [],
          message: "No videos found for this channel",
        },
        {
          headers: {
            "Cache-Control":
              "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        }
      );
    }

    // Extract video IDs
    const videoIds = searchData.items
      .map((item: SearchResultItem) => item.id.videoId)
      .filter(Boolean)
      .join(",");

    // Fetch video statistics (views, likes, comments)
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    let statsData: StatsResponse = { items: [] };
    if (statsResponse.ok) {
      statsData = await statsResponse.json();
    }

    const videosWithStats: VideoWithStats[] = searchData.items.map(
      (video: SearchResultItem) => {
        const stats = statsData.items.find(
          (stat: StatItem) => stat.id === video.id.videoId
        );
        return {
          ...video,
          statistics: stats?.statistics || {
            viewCount: "0",
            likeCount: "0",
            commentCount: "0",
          },
        };
      }
    );

    return NextResponse.json(
      { items: videosWithStats },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("YouTube videos API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      {
        error: errorMessage,
        message: "Please check your YouTube API key and Channel ID",
      },
      { status: 500 }
    );
  }
}
