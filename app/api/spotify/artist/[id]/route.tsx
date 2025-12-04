export async function GET(request, { params }) {
  // Await params in Next.js 15+
  const { id: artistId } = await params;

  try {
    // Get token first
    const tokenRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/spotify/token`
    );

    if (!tokenRes.ok) {
      throw new Error("Failed to get access token");
    }

    const { access_token } = await tokenRes.json();

    // Fetch artist data
    const response = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch artist data");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
