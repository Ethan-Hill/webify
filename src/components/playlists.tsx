import Image from "next/image";
import { NextPage } from "next";

interface Props {
  list: SpotifyApi.ListOfUsersPlaylistsResponse;
}

const Playlist: NextPage<Props> = (props) => {
  const { list } = props;

  return (
    <div>
      {list.items.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
          <Image
            src={item.images[0]?.url || "/not-found.png"}
            width="100"
            height="100"
            alt="Playlist image"
            placeholder="blur"
            blurDataURL={item.images[0]?.url || "/not-found.png"}
            className="h-auto w-auto"
          />
        </div>
      ))}
    </div>
  );
};
export default Playlist;
