export async function GET(request, { params }) {
  const { id: artistId } = await params;

  try {
    const tokenRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/spotify/token`
    );

    if (!tokenRes.ok) {
      throw new Error("Failed to get access token");
    }

    const { access_token } = await tokenRes.json();

    // Fetch top tracks
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top tracks");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
