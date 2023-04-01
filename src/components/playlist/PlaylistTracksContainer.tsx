import { type NextPage } from "next";

import PlaylistTrack from "./PlaylistTrack";
import Pagination from "../misc/Pagination";
import { motion } from "framer-motion";

interface Props {
  tracks: SpotifyApi.PlaylistTrackObject[];
  totalPages: number;
  page: number;
  setTracksPage: (newPage: number) => void;
}

const PlaylistTracksContainer: NextPage<Props> = (props) => {
  const { tracks, totalPages, page, setTracksPage } = props;

  const handlePageChange = (newPage: number) => {
    setTracksPage(newPage);
  };

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
      className="col-span-3 grid grid-cols-2 gap-2 rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition"
      transition={{
        staggerChildren: 0.1,
      }}
    >
      {tracks.map((trackParent) => (
        <PlaylistTrack key={trackParent.track?.id} track={trackParent} />
      ))}

      <Pagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={page}
      />
    </motion.div>
  );
};
export default PlaylistTracksContainer;
