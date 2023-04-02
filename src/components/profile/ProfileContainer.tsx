import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";

import ProfileDetails from "./Details/ProfileDetails";
import ProfileTopTracks from "./Tracks/ProfileTopTracks";

interface Props {
  profile: SpotifyApi.UserProfileResponse;
  topTracks: SpotifyApi.UsersTopTracksResponse;
}

const ProfileContainer: NextPage<Props> = (props) => {
  const { profile, topTracks } = props;

  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <div className="container py-24">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full"
        transition={{
          staggerChildren: 0.1,
        }}
      >
        <AnimatePresence>
          <div className="mx-auto flex flex-col gap-2 rounded-xl text-white ">
            <ProfileDetails profile={profile} />
            <ProfileTopTracks topTracks={topTracks} />
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfileContainer;
