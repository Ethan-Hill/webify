import Image from "next/image";
import { type NextPage } from "next";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  item: SpotifyApi.PlaylistObjectSimplified;
}

const PlaylistItem: NextPage<Props> = (props) => {
  const { item } = props;

  const playlistItem = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      whileTap: {
        scale: 1.2,
      },
    },
  };

  return (
    <motion.div
      variants={playlistItem}
      key={item.id}
      className="rounded-xl bg-black bg-opacity-25 text-white transition hover:bg-opacity-50"
    >
      <Link
        href={`/playlists/${item.id}`}
        className="flex items-center justify-between gap-2 p-5"
      >
        <Image
          src={item.images[0]?.url || "/not-found.png"}
          width="100"
          height="100"
          alt="Playlist image"
          placeholder="blur"
          blurDataURL={item.images[0]?.url || "/not-found.png"}
          className="h-32 w-32"
        />
        <span className="text-right text-xl font-bold">{item.name}</span>
      </Link>
    </motion.div>
  );
};
export default PlaylistItem;
