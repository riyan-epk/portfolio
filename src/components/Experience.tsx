"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const areas = [
  { t: ".NET Development", tags: ["C#", "ASP.NET Core", "Web APIs", "SQL Server"] },
  { t: "ERP Development", tags: ["Modules", "Reporting", "Elasticsearch", "Workflows"] },
  { t: "HCM & HR Systems", tags: ["Payroll", "Attendance", "Employees", "Leave"] },
  { t: "POS & Billing", tags: ["Invoicing", "FBR", "Inventory", "Receipts"] },
  { t: "Web & Mobile Apps", tags: ["React", "Next.js", "Flutter", "Realtime"] },
  { t: "Database & API Design", tags: ["Schema", "REST", "Indexing", "Caching"] },
  { t: "Third-Party Integrations", tags: ["Stripe", "Firebase", "PRA", "Hikvision"] },
];

export default function Experience() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="experience" className="bg-paper">
      <div className="shell py-24 lg:py-32">
        <SectionHead
          index="(06)"
          kicker="Expertise"
          title={
            <>
              Domains I&apos;ve actually <span className="grad-amber font-display italic">shipped in.</span>
            </>
          }
          intro="Not a list of tutorials — areas where I've delivered production systems that companies run their operations on."
        />

        <Reveal stagger={0.08} className="mt-14">
          {areas.map((a, i) => (
            <div
              key={a.t}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group relative grid grid-cols-[auto_1fr] items-center gap-6 border-t border-carbon/10 py-6 last:border-b lg:grid-cols-[auto_1fr_auto]"
            >
              <span className="font-mono text-[12px] text-amber">0{i + 1}</span>
              <h3
                className={`font-display text-2xl transition-all duration-300 lg:text-3xl ${
                  hover === i ? "translate-x-2 text-ember" : "text-carbon"
                }`}
              >
                {a.t}
              </h3>
              <div className="col-span-2 flex flex-wrap gap-2 lg:col-span-1 lg:justify-end">
                {a.tags.map((t) => (
                  <span
                    key={t}
                    className={`chip border transition-colors ${
                      hover === i
                        ? "border-amber/40 bg-amber/10 text-ember"
                        : "border-carbon/12 text-slate-2"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
