import { useSession } from "next-auth/react";
import Link from "next/link";
import { Be_Vietnam_Pro } from "next/font/google";
const BeVietnamPro = Be_Vietnam_Pro({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const Header = () => {
  const session = useSession();

  return (
    <header
      className={`absolute top-0 left-0 h-32 p-5 ${BeVietnamPro.className}`}
    >
      {session.data?.user ? (
        <div className="flex items-center gap-x-6">
          <Link href="/">
            <span className="inline-block font-bold text-white">Home</span>
          </Link>

          <Link href="/playlists">
            <span className="inline-block font-bold text-white">Playlists</span>
          </Link>

          <Link
            href="/profile"
            className=" flex items-center gap-x-3 rounded-xl"
          >
            <span className="inline-block font-bold text-white">Profile</span>
          </Link>
        </div>
      ) : null}
    </header>
  );
};
