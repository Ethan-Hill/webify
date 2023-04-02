import { motion } from "framer-motion";
import { NextPage } from "next";
import TopArtist from "./TopArtist";

interface Props {
  topArtists: SpotifyApi.UsersTopArtistsResponse;
}

const ProfileTopArtists: NextPage<Props> = (props) => {
  const { topArtists } = props;

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
        Top {topArtists.items.length} artists
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {topArtists.items.map((artist) => (
          <TopArtist artist={artist} key={artist.name} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileTopArtists;
