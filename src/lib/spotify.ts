const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists";
const PROFILE_ENDPOINT = "https://api.spotify.com/v1/users";
const PROFILE_TRACKS_ENDPOINT =
  "https://api.spotify.com/v1/me/top/tracks?limit=10";

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

export async function getUserPlaylistTracks(
  id: string,
  access_token: string,
  perPage: number,
  page: number
) {
  const res = await fetch(
    `${PLAYLIST_ENDPOINT}/${id}/tracks?offset=${
      (page - 1) * perPage
    }&limit=${perPage}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: SpotifyApi.PlaylistTrackResponse = await res.json();

  const tracks = data.items.map((item) => item);

  return { tracks, totalPages: Math.ceil(data.total / perPage) };
}

export async function getUserProfile(id: string, access_token: string) {
  const res = await fetch(`${PROFILE_ENDPOINT}/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.json();
}

export async function getUserTopTracks(access_token: string) {
  const res = await fetch(PROFILE_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res.json();
}
