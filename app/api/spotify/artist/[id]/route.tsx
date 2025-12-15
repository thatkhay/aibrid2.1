// app/api/spotify/artist/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSpotifyToken } from "@/lib/spotify-token-helper";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: artistId } = await params;

    if (!artistId) {
      return NextResponse.json(
        { error: "Artist ID is required" },
        { status: 400 }
      );
    }

    // Get token using centralized helper
    const access_token = await getSpotifyToken();

    // Fetch artist data from Spotify
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Spotify API error:", response.status, errorData);

      return NextResponse.json(
        {
          error: "Failed to fetch artist data from Spotify",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Spotify artist API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      {
        error: errorMessage,
        message: "Please check your Spotify credentials and Artist ID",
      },
      { status: 500 }
    );
  }
}
