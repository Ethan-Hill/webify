import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { env } from "~/env.mjs";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private",
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.refresh_token = account.refresh_token;
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
      } else if (Date.now() < token.expires_at! * 1000) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        try {
          // We need the `token_endpoint`.
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                  "Basic " +
                  Buffer.from(
                    env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET
                  ).toString("base64"),
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
              }),
              method: "POST",
            }
          );

          const tokens: {
            access_token: string;
            token_type: string;
            expires_in: number;
            refresh_token: string | undefined;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          } = await response.json();

          if (!response.ok) throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token,

            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }

      return token;
    },
    session({ session, token }) {
      session.user.refresh_token = token.refresh_token!;
      session.user.access_token = token.access_token!;
      return session;
    },
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
