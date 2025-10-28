"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useViewBehindContext } from "../context/view-behind";

export default function ChatBehind() {
  const { isViewOpen } = useViewBehindContext();
  console.log("Open View:", isViewOpen);

  const scrollRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <section
      ref={scrollRef}
      className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto bg-red-500 pt-10 pb-2 md:rounded-t-[2.5rem] md:rounded-b-lg"
    >
      <ul
        role="list"
        aria-live="polite"
        className="mt-auto space-y-8 leading-[200%]"
      >
        <AnimatePresence>
          <motion.li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam quos
            alias illo commodi adipisci obcaecati ducimus rerum perferendis,
            nesciunt odit modi placeat nostrum iste nihil officia sit quas quod
            necessitatibus doloribus! Eius, est debitis molestiae, repellat
            aspernatur culpa facilis mollitia quis quaerat suscipit deleniti
            animi cum inventore maiores recusandae rerum totam numquam
            cupiditate maxime? Quisquam accusamus quidem illum repellat labore
            officiis temporibus tempore, tenetur doloremque laborum quibusdam
            obcaecati, rerum excepturi unde. Iste expedita omnis tempore quod
            eveniet quas. Reiciendis dolore possimus hic, rem maiores illum
            velit quisquam delectus minima vero voluptatibus distinctio eius
            adipisci temporibus incidunt dolorum esse repellendus impedit!
          </motion.li>
        </AnimatePresence>
      </ul>
    </section>
  );
}
