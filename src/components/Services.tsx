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
      <div className="shell relative section-y">
        <SectionHead
          dark
          index="(07)"
          kicker="Services"
          title={
            <>
              What I can <span className="grad-amber font-display italic">build for you.</span>
            </>
          }
          intro="Pick a lane or hand me the whole build — here's where I plug in."
        />

        <Reveal stagger={0.07} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div key={s.t} className="card-ink card-hover group relative overflow-hidden p-6">
              <span className="font-mono text-[12px] text-amber">0{i + 1}</span>
              <h3 className="mt-5 font-display text-[1.15rem] leading-snug text-paper-1">{s.t}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-mist">{s.d}</p>
              <span className="absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber to-copper transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
