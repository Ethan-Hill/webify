/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /**
   * If you have the "experimental: { appDir: true }" setting enabled, then you
   * must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  images: {
    domains: [
      "i.scdn.co",
      "mosaic.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "wrapped-images.spotifycdn.com",
      "lineup-images.scdn.co",
      "blend-playlist-covers.spotifycdn.com",
      "image-cdn-ak.spotifycdn.com",
      "i2o.scdn.co",
      "dailymix-images.scdn.co",
    ],
  },
  experimental: {
    largePageDataBytes: 1000 * 50,
  },
};
export default config;
