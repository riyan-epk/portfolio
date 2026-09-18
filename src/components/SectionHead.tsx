"use client";
import Reveal from "./Reveal";

export default function SectionHead({
  index,
  kicker,
  title,
  intro,
  dark = false,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  align?: "left" | "center";
}) {
  const muted = dark ? "text-mist" : "text-slate-2";
  const strong = dark ? "text-paper-1" : "text-carbon";
  return (
    <Reveal
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "max-w-3xl"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] font-medium text-amber">{index}</span>
        <span className={`h-px w-8 ${dark ? "bg-white/20" : "bg-carbon/20"}`} />
        <span className={`eyebrow ${muted}`}>{kicker}</span>
      </div>
      <h2 className={`display-lg text-balance ${strong}`}>{title}</h2>
      {intro && (
        <p className={`max-w-xl text-[15px] leading-relaxed text-pretty ${muted}`}>{intro}</p>
      )}
    </Reveal>
  );
}
