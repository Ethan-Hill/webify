import { AnimatePresence, motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Counter from "~/components/misc/Counter";
import { getUserProfile } from "~/lib/spotify";

interface Props {
  profile: SpotifyApi.UserProfileResponse;
}

const Profile: NextPage<Props> = (props) => {
  const { profile } = props;

  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
  };

  const profileDetail = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <>
      <Head>
        <title>Profile | Webify</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <motion.div key="Image" variants={profileDetail}>
            <AnimatePresence>
              <Image
                src={
                  profile.images!.length > 0
                    ? profile.images![0]!.url
                    : "/not-found.png"
                }
                width={160}
                height={160}
                alt="Spotify profile image"
                className=" mr-4 w-auto rounded-md"
                priority
              />
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto grid grid-cols-1 gap-5 pb-5  md:grid-cols-2 xl:grid-cols-2"
            transition={{
              staggerChildren: 0.1,
            }}
          >
            <AnimatePresence>
              <motion.div
                key="Name"
                variants={profileDetail}
                className="flex min-h-[150px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
              >
                <p className="mb-3 text-xl"> Profile name</p>
                <div className="flex flex-grow items-center justify-center">
                  <p className="whitespace-pre-wrap break-words text-4xl font-bold ">
                    {profile.display_name}
                  </p>
                </div>
              </motion.div>

              <motion.div
                key="Followers"
                variants={profileDetail}
                className="flex min-h-[150px] flex-col rounded-xl bg-black bg-opacity-25 p-5 text-center text-white transition hover:bg-opacity-50"
              >
                <p className="mb-3 text-xl"> Profile followers</p>
                <div className="flex flex-grow items-center justify-center">
                  <Counter from={0} to={profile.followers?.total!} />
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;

  const token = await getToken({ req });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const profile: SpotifyApi.UserProfileResponse = await getUserProfile(
    token?.sub!,
    token?.access_token!
  );
  return {
    props: { profile },
  };
};

export default Profile;