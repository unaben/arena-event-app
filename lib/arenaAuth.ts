let jwtCache: { token: string; expiry: number } | null = null;

export async function getArenaJWT(): Promise<string> {
  if (jwtCache && Date.now() < jwtCache.expiry) {
    const timeLeft = Math.floor((jwtCache.expiry - Date.now()) / 1000 / 60);
    console.log(`✅ Using cached JWT (${timeLeft} minutes remaining)`);
    return jwtCache.token;
  }
  //ignore log - for debugging
  // console.log('🔑 Fetching new JWT from Arena Racing API...');

  try {
    const response = await fetch(process.env.ARENA_AUTH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.ARENA_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Arena auth failed: ${response.status}`);
    }

    const jwt = await response.text();

    // Cache for 25 minutes (5 min buffer before 30 min expiry)
    jwtCache = {
      token: jwt,
      expiry: Date.now() + 25 * 60 * 1000,
    };

    //ignore logs - for debugging
    // console.log('✅ JWT cached for 25 minutes');
    // console.log(`   Token: ${jwt.substring(0, 20)}...`);
    // console.log(`   Expires at: ${new Date(jwtCache.expiry).toISOString()}`);

    return jwt;
  } catch (error) {
    console.error("Arena Racing auth error:", error);
    throw new Error("Failed to authenticate with Arena Racing API");
  }
}
