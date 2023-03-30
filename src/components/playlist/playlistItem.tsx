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
    show: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={playlistItem}
      key={item.id}
      className="rounded-xl bg-black bg-opacity-25 p-5 text-white transition hover:bg-opacity-50"
    >
      <Link
        target="_blank"
        href={item.external_urls.spotify}
        className="flex flex-col-reverse justify-between gap-2 md:flex-row md:items-center"
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
        <span className="text-xl font-bold md:text-right">{item.name}</span>
      </Link>
    </motion.div>
  );
};
export default PlaylistItem;
