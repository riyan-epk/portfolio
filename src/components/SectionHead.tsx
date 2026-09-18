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
      className={
        align === "center"
          ? "mx-auto flex max-w-2xl flex-col items-center text-center"
          : "flex max-w-2xl flex-col"
      }
    >
      {/* eyebrow */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] font-medium text-amber">{index}</span>
        <span className={`h-px w-8 ${dark ? "bg-white/20" : "bg-carbon/20"}`} />
        <span className={`eyebrow ${muted}`}>{kicker}</span>
      </div>

      {/* generous gap → heading */}
      <h2 className={`mt-6 display-lg text-balance ${strong}`}>{title}</h2>

      {/* small gap → short supporting copy (max ~2 lines) */}
      {intro && (
        <p className={`mt-4 max-w-[46ch] text-[15px] leading-relaxed text-pretty ${muted}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
