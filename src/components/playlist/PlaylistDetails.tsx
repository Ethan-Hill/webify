import { type NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";

import Counter from "~/components/misc/Counter";
import PlaylistTracksContainer from "./PlaylistTracksContainer";

interface Props {
  playlist: SpotifyApi.PlaylistObjectFull;
  totalPages: number;
  page: number;
  setTracksPage: (page: number) => void;
  tracks: SpotifyApi.PlaylistTrackObject[];
}

const PlaylistDetails: NextPage<Props> = (props) => {
  const { playlist, totalPages, page, setTracksPage, tracks } = props;

  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const playlistDetail = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto grid grid-cols-1 gap-5 pb-5 text-white  md:w-3/4 md:grid-cols-2 xl:grid-cols-3"
      transition={{
        staggerChildren: 0.35,
      }}
    >
      <AnimatePresence>
        <motion.div
          variants={playlistDetail}
          className="flex min-h-[150px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
        >
          <p className="mb-3 text-xl"> Number of tracks</p>
          <div className="flex flex-grow items-center justify-center">
            <Counter from={0} to={playlist.tracks.total} />
          </div>
        </motion.div>
        <motion.div
          variants={playlistDetail}
          className="flex min-h-[150px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
        >
          <p className="mb-3 text-xl">Playlist Owner</p>
          <div className="flex flex-grow items-center justify-center">
            <p className="whitespace-pre-wrap break-words text-4xl font-bold ">
              {playlist.owner.display_name}
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={playlistDetail}
          className="flex min-h-[150px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
        >
          <p className="mb-3 text-xl"> Number of followers</p>
          <div className="flex flex-grow items-center justify-center">
            <Counter from={0} to={playlist.followers.total} />
          </div>
        </motion.div>

        <PlaylistTracksContainer
          tracks={tracks}
          totalPages={totalPages}
          page={page}
          setTracksPage={setTracksPage}
        />
      </AnimatePresence>
    </motion.div>
  );
};
export default PlaylistDetails;
