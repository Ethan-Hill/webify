const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

export async function getUsersPlaylists(access_token: string) {
  const res = await fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.json();
}
