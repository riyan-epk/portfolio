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
      <div className="shell relative section-y">
        <SectionHead
          dark
          index="(05)"
          kicker="How I Work"
          title={
            <>
              A repeatable path from <span className="grad-amber font-display italic">idea to production.</span>
            </>
          }
          intro="No mystery, no theatre — a process that keeps complex builds shippable."
        />

        <div className="relative mt-14 lg:mt-20">
          {/* desktop horizontal flow line */}
          <svg
            className="absolute left-0 top-7 hidden h-2 w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 8"
          >
            <line x1="0" y1="4" x2="1000" y2="4" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line
              x1="0" y1="4" x2="1000" y2="4"
              stroke="#f5a524" strokeWidth="1.5" strokeDasharray="6 14"
              style={{ animation: "dash-flow 20s linear infinite" }}
            />
          </svg>

          <Reveal stagger={0.12} className="grid gap-x-6 lg:grid-cols-6">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="group relative grid grid-cols-[3.5rem_1fr] gap-5 pb-12 last:pb-0 lg:block lg:pb-0"
              >
                {/* timeline node + connector */}
                <div className="relative flex justify-center lg:justify-start">
                  {/* mobile vertical connector with travelling pulse */}
                  {i < steps.length - 1 && (
                    <span className="absolute left-1/2 top-14 bottom-[-1rem] w-px -translate-x-1/2 overflow-hidden bg-white/10 lg:hidden">
                      <span
                        className="absolute left-1/2 h-3.5 w-px -translate-x-1/2 bg-amber"
                        style={{ animation: "flow-down 2.6s linear infinite", animationDelay: `${i * 0.35}s` }}
                      />
                    </span>
                  )}
                  <div className="relative z-10 mb-0 grid h-14 w-14 place-items-center rounded-full border border-amber/40 bg-ink font-mono text-[13px] text-amber transition-all duration-300 group-hover:border-amber group-hover:shadow-[0_0_22px_rgba(245,165,36,0.28)] lg:mb-6 lg:h-12 lg:w-12">
                    {s.n}
                  </div>
                </div>

                {/* content */}
                <div className="pt-1.5 lg:pt-0">
                  <h3 className="font-display text-xl text-paper-1">{s.t}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-mist">{s.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
