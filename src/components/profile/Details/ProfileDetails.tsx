import { motion } from "framer-motion";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Counter from "~/components/misc/Counter";

interface Props {
  profile: SpotifyApi.UserProfileResponse;
}

const ProfileDetails: NextPage<Props> = (props) => {
  const { profile } = props;

  const profileDetail = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      key="Profile"
      variants={profileDetail}
      className="rounded-t-xl bg-black bg-opacity-25 text-white transition hover:bg-opacity-50"
    >
      <Link
        href={profile.external_urls.spotify}
        target="_blank"
        className="flex flex-col flex-wrap p-5  md:flex-row"
      >
        <Image
          src={
            profile.images!.length > 0
              ? profile.images![0]!.url
              : "/not-found.png"
          }
          width={160}
          height={160}
          alt="Spotify profile image"
          className=" mr-4 h-auto w-52 rounded-md"
          priority
        />
        <div>
          <div>
            <p className="mt-4 whitespace-pre-wrap break-words text-4xl font-bold">
              {profile.display_name}
            </p>
          </div>
          <p className="my-3 text-xl"> Profile followers</p>
          <div className="flex">
            <Counter from={0} to={profile.followers?.total!} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProfileDetails;
