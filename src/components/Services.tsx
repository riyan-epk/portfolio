"use client";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const services = [
  { t: "Full-Stack Development", d: "End-to-end product builds — interface, API, database and deployment." },
  { t: ".NET Development", d: "Enterprise back-ends and services in C# / ASP.NET Core." },
  { t: "MERN Development", d: "React, Node, Express and MongoDB web applications." },
  { t: "Flutter Development", d: "Cross-platform mobile apps from a single codebase." },
  { t: "UI/UX Development", d: "Interfaces that are considered, accessible and a pleasure to use." },
  { t: "ERP / POS Systems", d: "Operational software for inventory, billing, HR and reporting." },
  { t: "API Integrations", d: "Payments, tax, hardware and third-party services, wired reliably." },
  { t: "Custom Business Software", d: "Bespoke systems shaped around how your business actually runs." },
];

export default function Services() {
  return (
    <section id="services" className="section-ink relative overflow-hidden">
      <div
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.10), transparent 65%)" }}
      />
      <div className="shell relative py-24 lg:py-32">
        <SectionHead
          dark
          index="(07)"
          kicker="Services"
          title={
            <>
              What I can <span className="grad-amber font-display italic">build for you.</span>
            </>
          }
        />

        <Reveal stagger={0.08} className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] sm:grid-cols-2">
          {services.map((s, i) => (
            <div
              key={s.t}
              className="group relative bg-ink p-8 transition-colors hover:bg-ink-2"
            >
              <span className="font-mono text-[12px] text-amber">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl text-paper-1">{s.t}</h3>
              <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-mist">{s.d}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-amber to-copper transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
