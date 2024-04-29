import Link from "next/link";

export default function NotFound() {
  return (
    <main className="main text-center">
      <p className="mb-2 mt-8">
        Uh oh... we couldn&apos;t find the page you were looking for.
      </p>
      <p>
        Return to the{" "}
        <Link href={"/faq"} className="special link">
          FAQ
        </Link>{" "}
        or{" "}
        <Link href={"/delegates"} className="special link">
          Delegates
        </Link>{" "}
        page.
      </p>
    </main>
  );
}
