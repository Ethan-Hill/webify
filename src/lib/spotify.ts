const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists";

export async function getUserPlaylists(access_token: string) {
  const res = await fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.json();
}

export async function getUserPlaylist(id: string, access_token: string) {
  const res = await fetch(`${PLAYLIST_ENDPOINT}/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.json();
}
