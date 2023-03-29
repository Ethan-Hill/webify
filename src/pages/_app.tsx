import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { Header } from "~/components/master/header";

import { Be_Vietnam_Pro } from "next/font/google";
const BeVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

import "~/styles/globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    router.isReady && setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <SessionProvider session={session}>
          <Header />
          <main className={BeVietnamPro.className}>
            <Component {...pageProps} />{" "}
          </main>
        </SessionProvider>
      )}
    </>
  );
};

export default MyApp;
