"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function FeedbackFlag() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const feedbackUrl = "https://forms.gle/k6VdUY2JrvxYZkrj7";
  return isDesktop ? (
    <a href={feedbackUrl} target="_blank">
      <div className="fixed top-1/4 -right-[3.8rem] w-36 h-10 p-1 bg-optimism-red text-white font-bold -rotate-90 rounded-md text-center hover:-right-[3.55rem] ease-in-out duration-150">
        Give Feedback
      </div>
    </a>
  ) : (
    <></>
  );
}
