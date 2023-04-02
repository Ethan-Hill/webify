import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

interface Props {
  artist: SpotifyApi.ArtistObjectFull;
}

const TopArtist: NextPage<Props> = (props) => {
  const { artist } = props;

  const topTrack = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={topTrack}
      key={artist.id}
      className="rounded-xl bg-black bg-opacity-25 text-white transition hover:bg-opacity-50"
    >
      <div className="flex items-center justify-between gap-3">
        <Link
          href={artist.external_urls.spotify}
          target="_blank"
          className="flex w-full items-center gap-2 p-3"
        >
          <Image
            src={artist.images[0]?.url || "/not-found.png"}
            width="100"
            height="100"
            alt="Playlist image"
            placeholder="blur"
            blurDataURL={artist.images[0]?.url || "/not-found.png"}
            className="h-24 w-24"
          />
          <p className="text-xl font-bold">{artist.name}</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default TopArtist;
