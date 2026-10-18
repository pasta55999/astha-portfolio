import Link from "next/link";
import { PrimaryButton, GradientText, SectionBackdrop } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-5 pt-24 text-center">
      <SectionBackdrop variant="c" fadeTop={false} />
      <div className="relative z-10">
        <p className="eyebrow text-violet-300/90">{"// 404 · not found"}</p>
        <h1 className="font-display mt-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
          This page is <GradientText>still an idea.</GradientText>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-white/60">Nothing lives at this address. The work, the thinking and the contact details are all back on the home page.</p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <PrimaryButton href="/">Back home</PrimaryButton>
          <Link href="/projects" className="text-sm font-medium text-violet-300 hover:text-white">
            All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
