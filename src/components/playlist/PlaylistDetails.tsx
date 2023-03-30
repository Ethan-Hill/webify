import { type NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import Counter from "~/components/misc/Counter";
import PlaylistTrack from "./PlaylistTrack";

interface Props {
  playlist: SpotifyApi.PlaylistObjectFull;
}

const PlaylistDetails: NextPage<Props> = (props) => {
  const { playlist } = props;

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
          className="flex min-h-[212px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
        >
          <p className="text-3xl"> Number of tracks</p>
          <div className="flex flex-grow items-center justify-center">
            <Counter from={0} to={playlist.tracks.total} />
          </div>
        </motion.div>

        <motion.div
          variants={playlistDetail}
          className="flex min-h-[212px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
        >
          <p className="text-3xl">Playlist Owner</p>
          <div className="flex flex-grow items-center justify-center">
            <p className="whitespace-pre-wrap break-words text-4xl font-bold ">
              {playlist.owner.display_name}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={playlistDetail}
          className="flex min-h-[212px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
        >
          <p className="text-3xl"> Number of followers</p>
          <div className="flex flex-grow items-center justify-center">
            <Counter from={0} to={playlist.followers.total} />
          </div>
        </motion.div>

        <motion.div
          variants={container}
          className="col-span-3 flex flex-col gap-y-2 rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition"
          transition={{
            staggerChildren: 0.1,
          }}
        >
          {playlist.tracks.items.map((trackParent) => (
            <PlaylistTrack key={trackParent.track?.id} track={trackParent} />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
export default PlaylistDetails;
