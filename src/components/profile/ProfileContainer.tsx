import { AnimatePresence, motion } from "framer-motion";
import { NextPage } from "next";

import ProfileDetails from "./Details/ProfileDetails";
import ProfileTopTracks from "./Tracks/ProfileTopTracks";
import ProfileTopArtists from "./Artists/ProfileTopArtists";

interface Props {
  profile: SpotifyApi.UserProfileResponse;
  topTracks: SpotifyApi.UsersTopTracksResponse;
  topArtists: SpotifyApi.UsersTopArtistsResponse;
}

const ProfileContainer: NextPage<Props> = (props) => {
  const { profile, topTracks, topArtists } = props;

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
        className="container mx-auto mt-16 gap-12 px-4  "
        transition={{
          staggerChildren: 0.1,
        }}
      >
        <AnimatePresence>
          <div className="mx-auto flex flex-col gap-2 rounded-xl text-white ">
            <ProfileDetails profile={profile} />
            <ProfileTopTracks topTracks={topTracks} />
            <ProfileTopArtists topArtists={topArtists} />
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProfileContainer;
