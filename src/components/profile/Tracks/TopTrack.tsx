import { motion } from "framer-motion";
import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import PreviewTrack from "./Track/PreviewTrack";

interface Props {
  track: SpotifyApi.TrackObjectFull;
}

const TopTrack: NextPage<Props> = (props) => {
  const { track } = props;

  const topTrack = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={topTrack}
      key={track.id}
      className="rounded-xl bg-black bg-opacity-25 text-white transition hover:bg-opacity-50"
    >
      <div className="flex items-center justify-between gap-3">
        <Link
          href={track.external_urls.spotify}
          target="_blank"
          className="flex w-full items-center gap-2 p-3"
        >
          <Image
            src={track.album.images[0]?.url || "/not-found.png"}
            width="100"
            height="100"
            alt="Playlist image"
            placeholder="blur"
            blurDataURL={track.album.images[0]?.url || "/not-found.png"}
            className="h-24 w-24"
          />
          <p className="text-xl font-bold">{track.name}</p>
        </Link>
        <PreviewTrack track={track} />
      </div>
    </motion.div>
  );
};

export default TopTrack;
