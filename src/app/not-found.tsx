import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-[1400px] flex-col justify-center px-5 pt-24 md:px-10">
      <p className="eyebrow text-lime">404 · not found</p>
      <h1 className="mt-6 font-display text-6xl md:text-8xl">
        This page is <span className="italic text-paper-dim">still an idea.</span>
      </h1>
      <p className="mt-6 max-w-md text-paper-dim leading-relaxed">Nothing lives at this address. The work, the thinking and the contact details are all back on the home page.</p>
      <div className="mt-10 flex gap-3">
        <Button href="/">Back home</Button>
        <Link href="/projects" className="link-ul self-center font-mono text-xs uppercase tracking-[0.16em] text-paper-dim hover:text-paper">
          All projects
        </Link>
      </div>
    </div>
  );
}
