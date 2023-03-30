import Image from "next/image";
import { type NextPage } from "next";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  track: SpotifyApi.PlaylistTrackObject;
}

const PlaylistTrack: NextPage<Props> = (props) => {
  const { track } = props;

  const playlistTrack = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <Link target="_blank" href={track.track?.external_urls.spotify!}>
      <motion.div
        variants={playlistTrack}
        className="flex items-center gap-5 rounded-xl bg-black bg-opacity-50 p-5 transition duration-[25ms] hover:bg-opacity-40"
      >
        <Image
          width={64}
          height={64}
          src={track.track?.album.images[0]?.url!}
          alt="Track album cover"
        />

        <div>
          <p>{track.track?.name}</p>
        </div>
      </motion.div>
    </Link>
  );
};
export default PlaylistTrack;
