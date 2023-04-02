import Router from "next/router";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

// Types import
import { type AppType } from "next/app";
import { type Session } from "next-auth";

// Google fonts
import { Be_Vietnam_Pro } from "next/font/google";
const BeVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// CSS imports
import "~/styles/globals.css";
import "~/styles/nprogress.min.css";

// Components
import Transition from "~/components/misc/Transition";
import Nprogress from "nprogress";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      Nprogress.start();
    });

    Router.events.on("routeChangeComplete", () => {
      Nprogress.done(false);
    });
  }, [Router]);

  return (
    <SessionProvider session={session}>
      <Transition>
        <main className={BeVietnamPro.className}>
          <Component {...pageProps} />
        </main>
      </Transition>
    </SessionProvider>
  );
};

export default MyApp;
