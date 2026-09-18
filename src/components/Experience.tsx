"use client";
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
  return (
    <section id="experience" className="bg-paper">
      <div className="shell section-y">
        <SectionHead
          index="(06)"
          kicker="Expertise"
          title={
            <>
              Domains I&apos;ve actually <span className="grad-amber font-display italic">shipped in.</span>
            </>
          }
          intro="Areas where I've shipped production systems companies actually run on."
        />

        <Reveal
          stagger={0.06}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {areas.map((a, i) => (
            <article
              key={a.t}
              className="card card-hover group flex min-h-[190px] flex-col p-7"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[12px] text-amber">0{i + 1}</span>
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-carbon/15 transition-colors group-hover:bg-amber" />
              </div>

              <h3 className="mt-6 font-display text-[1.3rem] leading-snug text-carbon transition-colors group-hover:text-ember">
                {a.t}
              </h3>

              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {a.tags.map((t) => (
                  <span key={t} className="chip border border-carbon/12 text-slate-2">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
