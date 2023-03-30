import { type NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import PlaylistItem from "./playlistItem";

interface Props {
  list: SpotifyApi.ListOfUsersPlaylistsResponse;
}

const PlaylistContainer: NextPage<Props> = (props) => {
  const { list } = props;

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
      variants={container}
      initial="hidden"
      animate="show"
      className="md:grid-col-2 grid-col-1 mx-auto grid w-3/4 gap-5  pb-5 lg:grid-cols-3"
      transition={{
        staggerChildren: 0.1,
      }}
    >
      <AnimatePresence>
        {list.items.map((item) => (
          <PlaylistItem item={item} key={item.id} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
export default PlaylistContainer;
