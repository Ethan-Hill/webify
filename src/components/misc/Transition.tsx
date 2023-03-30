import { type NextPage } from "next";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Header } from "../master/header";

interface Props {
  children?: ReactNode;
}

const variants = {
  out: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const Transition: NextPage<Props> = ({ children }: Props) => {
  const { asPath } = useRouter();

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-r from-orange-400 to-rose-400">
      <Header />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={asPath}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default Transition;
