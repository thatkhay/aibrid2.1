import { NextRequest, NextResponse } from "next/server";

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

    // Fetch channel statistics from YouTube
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("YouTube API error:", response.status, errorData);

      return NextResponse.json(
        {
          error: "Failed to fetch YouTube channel data",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        {
          error: "Channel not found",
          message: "Please check your Channel ID",
        },
        { status: 404 }
      );
    }

    // Return the first (and should be only) channel result
    return NextResponse.json(data.items[0], {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("YouTube channel API error:", error);
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
