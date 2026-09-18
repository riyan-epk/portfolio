"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

const categories = [
  { key: "frontend", label: "Frontend", skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"] },
  { key: "backend", label: "Backend", skills: [".NET", "ASP.NET Core", "C#", "Node.js", "Express"] },
  { key: "mobile", label: "Mobile", skills: ["Flutter", "Dart"] },
  { key: "databases", label: "Databases", skills: ["SQL Server", "PostgreSQL", "MongoDB", "Supabase", "Elasticsearch"] },
  { key: "integrations", label: "Integrations", skills: ["REST APIs", "Payment APIs", "Stripe", "FBR", "PRA", "Hikvision", "Firebase", "Government APIs"] },
  { key: "enterprise", label: "Enterprise", skills: ["ERP", "POS", "HCM", "Hospital Mgmt", "Billing", "Attendance", "Payroll", "HR"] },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const cat = categories[active];
  const total = categories.reduce((n, c) => n + c.skills.length, 0);

  return (
    <section id="skills" className="bg-paper">
      <div className="shell section-y">
        <SectionHead
          index="(02)"
          kicker="Capabilities"
          title={
            <>
              A stack chosen for <span className="grad-amber font-display italic">range</span> — from
              pixels to production.
            </>
          }
          intro={`${total} technologies across six disciplines. Pick a layer to see what I reach for.`}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* tabs */}
          <Reveal stagger={0.06} className="flex flex-col gap-1.5">
            {categories.map((c, i) => (
              <button
                key={c.key}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-all ${
                  active === i
                    ? "border-amber/40 bg-paper-card shadow-[0_8px_24px_rgba(20,22,28,0.06)]"
                    : "border-transparent hover:border-carbon/10 hover:bg-paper-card/60"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`font-mono text-[11px] ${active === i ? "text-amber" : "text-slate-2/60"}`}>
                    0{i + 1}
                  </span>
                  <span className={`text-[15px] font-medium ${active === i ? "text-carbon" : "text-slate-2"}`}>
                    {c.label}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-slate-2/50">{c.skills.length}</span>
              </button>
            ))}
          </Reveal>

          {/* code panel */}
          <Reveal x={20} className="min-w-0">
            <div className="section-ink overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(20,22,28,0.18)]">
              <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-[12px] text-mist">
                  skills / {cat.key}.json
                </span>
              </div>
              <div className="p-6 font-mono text-[13px] leading-[1.9] sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cat.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-fog">{"{"}</div>
                    <div className="pl-5">
                      <span className="text-mist">&quot;discipline&quot;</span>
                      <span className="text-fog">: </span>
                      <span className="grad-amber">&quot;{cat.label}&quot;</span>
                      <span className="text-fog">,</span>
                    </div>
                    <div className="pl-5 text-mist">&quot;skills&quot;<span className="text-fog">: [</span></div>
                    <div className="flex flex-wrap gap-x-1 gap-y-1.5 pl-10">
                      {cat.skills.map((s, i) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.05 + i * 0.05 }}
                          className="text-[#f5b971]"
                        >
                          &quot;{s}&quot;{i < cat.skills.length - 1 ? <span className="text-fog">,</span> : null}
                        </motion.span>
                      ))}
                    </div>
                    <div className="pl-5 text-fog">]</div>
                    <div className="text-fog">{"}"}</div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
