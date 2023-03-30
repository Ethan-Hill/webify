import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Be_Vietnam_Pro } from "next/font/google";
const BeVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

import "~/styles/globals.css";
import Transition from "~/components/misc/Transition";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Transition>
        <main className={BeVietnamPro.className}>
          <Component {...pageProps} />
        </main>
      </Transition>{" "}
    </SessionProvider>
  );
};

export default MyApp;
