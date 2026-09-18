"use client";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const steps = [
  { n: "01", t: "Understand", d: "Map the real problem, users and constraints before a line of code." },
  { n: "02", t: "Design", d: "Wireframe flows and interfaces — decisions on paper are cheap." },
  { n: "03", t: "Build", d: "Ship in vertical slices with clean, typed, reviewable code." },
  { n: "04", t: "Integrate", d: "Wire in payments, tax, hardware and third-party services." },
  { n: "05", t: "Test", d: "Harden against edge cases, load and the messy real world." },
  { n: "06", t: "Deploy", d: "Release, monitor and iterate with the data coming back." },
];

export default function Process() {
  return (
    <section id="process" className="section-ink relative overflow-hidden">
      <div className="grid-fabric pointer-events-none absolute inset-0 opacity-40" />
      <div className="shell relative py-24 lg:py-32">
        <SectionHead
          dark
          index="(04)"
          kicker="How I Work"
          title={
            <>
              A repeatable path from <span className="grad-amber font-display italic">idea to production.</span>
            </>
          }
          intro="No mystery, no theatre — a process that keeps complex builds shippable and predictable."
        />

        {/* flow line */}
        <div className="relative mt-16">
          <svg className="absolute left-0 top-6 hidden h-2 w-full lg:block" preserveAspectRatio="none" viewBox="0 0 1000 8">
            <line x1="0" y1="4" x2="1000" y2="4" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line
              x1="0" y1="4" x2="1000" y2="4"
              stroke="#f5a524" strokeWidth="1.5"
              strokeDasharray="6 14"
              style={{ animation: "dash-flow 20s linear infinite" }}
            />
          </svg>

          <Reveal stagger={0.1} className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((s) => (
              <div key={s.n} className="relative">
                <div className="relative z-10 mb-5 grid h-12 w-12 place-items-center rounded-full border border-amber/40 bg-ink font-mono text-[13px] text-amber">
                  {s.n}
                </div>
                <h3 className="font-display text-lg text-paper-1">{s.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mist">{s.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
