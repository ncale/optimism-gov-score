import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/app/providers";
import Header from "@/components/header";
import FeedbackFlag from "@/components/feedback-flag";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const font = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "GovScore",
  description:
    "Ensure your governance tokens are allocated to the best delegates.",
  metadataBase: new URL("https://govscore.xyz/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <Header />
          <FeedbackFlag />
          {children}
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
