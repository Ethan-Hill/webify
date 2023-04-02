import { GetServerSideProps, NextPage } from "next";
import { getToken } from "next-auth/jwt";
import Head from "next/head";
import ProfileContainer from "~/components/profile/ProfileContainer";
import { getUserProfile, getUserTopTracks } from "~/lib/spotify";

interface Props {
  profile: SpotifyApi.UserProfileResponse;
  topTracks: SpotifyApi.UsersTopTracksResponse;
}

const Profile: NextPage<Props> = (props) => {
  const { profile, topTracks } = props;

  return (
    <>
      <Head>
        <title>Profile | Webify</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex min-h-screen flex-col items-center justify-center">
        <ProfileContainer profile={profile} topTracks={topTracks} />
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const topTracks: SpotifyApi.UserProfileResponse = await getUserTopTracks(
    token?.access_token!
  );

  return {
    props: { profile, topTracks },
  };
};

export default Profile;
