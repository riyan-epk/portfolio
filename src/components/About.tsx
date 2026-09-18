"use client";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const focus = [
  {
    n: "01",
    title: "Web Applications",
    body: "Fast, accessible interfaces and robust back-ends — React & Next.js on the front, .NET and Node powering the API.",
  },
  {
    n: "02",
    title: "Mobile Applications",
    body: "Cross-platform apps in Flutter with native-grade motion, offline behaviour and real-time sync.",
  },
  {
    n: "03",
    title: "Business Systems",
    body: "ERP, POS, HR/HCM and billing platforms built to hold up under real operational load.",
  },
  {
    n: "04",
    title: "API Integrations",
    body: "Payments, government tax (FBR/PRA), hardware (Hikvision) and third-party services, wired reliably.",
  },
];

const scope = ["Frontend", "Backend", "Mobile", "Databases", "APIs", "ERP", "POS", "Healthcare", "Payments", "Tax Systems"];

export default function About() {
  return (
    <section id="about" className="relative bg-paper">
      {/* seam from the ink hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/[0.06] to-transparent" />
      <div className="shell relative py-24 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead
              index="(01)"
              kicker="About"
              title={
                <>
                  I turn tangled requirements into{" "}
                  <span className="grad-amber font-display italic">software that ships.</span>
                </>
              }
              intro="I'm Riyan Mursaleen — a full-stack developer who's spent years shipping production web, mobile and business systems. I care equally about how a product feels to use and how it holds together under the hood."
            />
            <Reveal delay={0.1} className="mt-9 flex flex-wrap gap-2">
              {scope.map((s) => (
                <span
                  key={s}
                  className="chip border border-carbon/12 bg-paper-card text-slate-2"
                >
                  {s}
                </span>
              ))}
            </Reveal>
          </div>

          <Reveal stagger={0.12} className="flex flex-col">
            {focus.map((f) => (
              <div
                key={f.n}
                className="group flex gap-6 border-t border-carbon/10 py-7 transition-colors last:border-b hover:bg-paper-card"
              >
                <span className="font-mono text-[12px] text-amber">{f.n}</span>
                <div>
                  <h3 className="font-display text-xl text-carbon transition-colors group-hover:text-ember">
                    {f.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-slate-2">
                    {f.body}
                  </p>
                </div>
                <svg
                  className="ml-auto mt-1 h-5 w-5 shrink-0 text-carbon/30 transition-all group-hover:translate-x-1 group-hover:text-amber"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
