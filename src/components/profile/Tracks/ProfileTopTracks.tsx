import { motion } from "framer-motion";
import { NextPage } from "next";
import TopTrack from "../Tracks/TopTrack";

interface Props {
  topTracks: SpotifyApi.UsersTopTracksResponse;
}

const ProfileTopTracks: NextPage<Props> = (props) => {
  const { topTracks } = props;

  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      key="Top tracks"
      className="bg-black bg-opacity-25 p-5 text-white"
      variants={container}
      transition={{
        staggerChildren: 0.1,
      }}
    >
      <h2 className="my-4 whitespace-pre-wrap break-words text-4xl font-bold">
        Top {topTracks.items.length} tracks
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {topTracks.items.map((track) => (
          <TopTrack track={track} key={track.name} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileTopTracks;
