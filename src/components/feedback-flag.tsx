"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function FeedbackFlag() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <a href="" target="_blank">
      <div className="fixed top-1/4 -right-[3.8rem] w-36 h-10 p-1 bg-red-700 text-white font-bold -rotate-90 rounded-md text-center hover:-right-[3.6rem] ease-in-out duration-75">
        Give Feedback
      </div>
    </a>
  ) : (
    <></>
  );
}
