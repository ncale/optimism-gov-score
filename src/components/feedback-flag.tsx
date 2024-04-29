"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function FeedbackFlag() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const feedbackUrl = "https://forms.gle/k6VdUY2JrvxYZkrj7";
  return isDesktop ? (
    <a href={feedbackUrl} target="_blank">
      <div className="fixed -right-[3.8rem] top-1/4 h-10 w-36 -rotate-90 rounded-md bg-optimism-red p-1 text-center font-bold text-white duration-150 ease-in-out hover:-right-[3.55rem]">
        Give Feedback
      </div>
    </a>
  ) : (
    <></>
  );
}
