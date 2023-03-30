import { animate } from "framer-motion";
import { useRef, useEffect } from "react";

const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current!;

    const controls = animate(from, to, {
      ease: "easeInOut",
      duration: 3,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span className="text-8xl font-bold" ref={nodeRef} />;
};

export default Counter;
