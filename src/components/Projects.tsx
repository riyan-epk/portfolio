"use client";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Magnetic from "./Magnetic";

type Project = {
  n: string;
  name: string;
  tagline: string;
  desc: string;
  tech: string[];
  url: string | null;
  type: "mobile" | "web" | "dashboard" | "desktop";
};

const projects: Project[] = [
  { n: "01", name: "My Stay", tagline: "Rental & Accommodation Marketplace", desc: "A two-sided marketplace for listings, bookings, reviews, messaging and host workflows — with full authentication.", tech: ["Flutter", "Supabase", "Firebase", "Next.js"], url: "https://mystay.live", type: "mobile" },
  { n: "02", name: "Drive Flex", tagline: "Vehicle Rental & Transport Platform", desc: "Booking and fleet management with integrated payments and a streamlined reservation flow.", tech: ["React", "Next.js", "REST APIs", "Stripe"], url: "https://drive-flex.uk", type: "web" },
  { n: "03", name: "Horizon Hospital", tagline: "Hospital Management System", desc: "Patients, appointments, records and billing in one operational dashboard built to run a real facility.", tech: [".NET", "SQL Server", "React", "REST APIs"], url: "https://horizon-hospital.com", type: "dashboard" },
  { n: "04", name: "QR Dine", tagline: "Restaurant Ordering & Management", desc: "Scan-to-order with real-time kitchen updates, menu management and order tracking.", tech: ["React", "Next.js", "Supabase", "Realtime"], url: "https://qrdine.mystay.live", type: "mobile" },
  { n: "05", name: "Khalish Bazar", tagline: "E-commerce Platform", desc: "A full storefront — catalogue, cart, checkout and admin — on a MERN foundation.", tech: ["React", "Next.js", "Node.js", "MongoDB"], url: "https://kkhalisbazarpk.com", type: "web" },
  { n: "06", name: "ISOLAT ERP", tagline: "Enterprise ERP & Business Integration", desc: "An ERP backbone with search, reporting and REST integrations connecting the whole operation.", tech: [".NET", "C#", "SQL Server", "Elasticsearch"], url: "https://isolaterp.com", type: "desktop" },
  { n: "07", name: "POS & Medical Billing", tagline: "FBR-Integrated Business Software", desc: "Point-of-sale and medical billing wired directly into FBR tax reporting — compliant and audit-ready.", tech: [".NET", "C#", "SQL Server", "FBR API"], url: null, type: "desktop" },
];

/* ---- abstract ink mockups, one look per product type ---- */
function Bars() {
  return (
    <div className="flex h-16 items-end gap-1.5">
      {[40, 65, 45, 80, 55, 95, 70].map((h, i) => (
        <div key={i} className="w-full rounded-sm bg-amber/70" style={{ height: `${h}%`, opacity: 0.4 + i * 0.08 }} />
      ))}
    </div>
  );
}

function Mockup({ type }: { type: Project["type"] }) {
  if (type === "mobile") {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-[78%] w-[150px] rounded-[26px] border border-white/12 bg-ink-2 p-2.5 shadow-2xl">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/15" />
          <div className="h-20 rounded-xl bg-gradient-to-br from-amber/25 to-copper/10" />
          <div className="mt-2.5 space-y-1.5">
            <div className="h-2 w-4/5 rounded bg-white/12" />
            <div className="h-2 w-3/5 rounded bg-white/10" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-md bg-white/[0.06]" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (type === "dashboard") {
    return (
      <div className="h-full p-6">
        <div className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-2 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber" />
            <div className="h-2 w-24 rounded bg-white/14" />
            <div className="ml-auto h-2 w-10 rounded bg-white/10" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["+18%", "2.4k", "98%"].map((s) => (
              <div key={s} className="rounded-lg bg-white/[0.05] p-2.5">
                <div className="h-1.5 w-8 rounded bg-white/12" />
                <div className="mt-1.5 font-mono text-[13px] text-amber">{s}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex-1 rounded-lg bg-white/[0.04] p-3">
            <Bars />
          </div>
        </div>
      </div>
    );
  }
  if (type === "desktop") {
    return (
      <div className="h-full p-6">
        <div className="flex h-full rounded-xl border border-white/10 bg-ink-2">
          <div className="w-1/4 border-r border-white/8 p-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`mb-2 h-2 rounded ${i === 1 ? "bg-amber/70" : "bg-white/10"}`} style={{ width: `${90 - i * 8}%` }} />
            ))}
          </div>
          <div className="flex-1 p-4">
            <div className="mb-3 flex gap-2">
              <div className="h-2 w-20 rounded bg-white/14" />
              <div className="ml-auto h-6 w-16 rounded bg-amber/80" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-white/[0.04] p-2">
                  <div className="h-2 w-2 rounded-full bg-white/20" />
                  <div className="h-2 flex-1 rounded bg-white/10" />
                  <div className="h-2 w-8 rounded bg-white/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // web
  return (
    <div className="h-full p-6">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-2">
        <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-2 h-3 flex-1 rounded bg-white/[0.06]" />
        </div>
        <div className="flex-1 p-4">
          <div className="h-16 rounded-lg bg-gradient-to-r from-amber/25 to-copper/10" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-1.5 rounded-lg bg-white/[0.05] p-2.5">
                <div className="h-8 rounded bg-white/[0.06]" />
                <div className="h-1.5 w-full rounded bg-white/12" />
                <div className="h-1.5 w-2/3 rounded bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1;
  const inner = (
    <div
      data-cursor="view"
      className="section-ink group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 hover:border-amber/30"
    >
      <div className="grid-fabric absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.16), transparent 65%)" }}
      />
      <div className="relative h-full transition-transform duration-700 group-hover:scale-[1.03]">
        <Mockup type={p.type} />
      </div>
    </div>
  );

  return (
    <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        {p.url ? (
          <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
            {inner}
          </a>
        ) : (
          inner
        )}
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[13px] text-amber">{p.n}</span>
          <span className="h-px flex-1 bg-carbon/10" />
        </div>
        <h3 className="mt-5 font-display text-4xl text-carbon lg:text-5xl">{p.name}</h3>
        <p className="mt-2 text-[15px] font-medium text-ember">{p.tagline}</p>
        <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-2">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="chip border border-carbon/12 text-slate-2">{t}</span>
          ))}
        </div>
        <div className="mt-7">
          {p.url ? (
            <Magnetic strength={0.35}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2.5 rounded-full border border-carbon/15 px-5 py-3 text-[13px] font-semibold text-carbon transition-colors hover:border-amber hover:text-ember"
              >
                Visit live site
                <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
            </Magnetic>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-carbon/5 px-5 py-3 font-mono text-[12px] text-slate-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" /> Private · under NDA
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-paper">
      <div className="shell py-24 lg:py-32">
        <SectionHead
          index="(03)"
          kicker="Selected Work"
          title={
            <>
              Products in the wild, <span className="grad-amber font-display italic">not case-study fiction.</span>
            </>
          }
          intro="Seven shipped systems across marketplaces, healthcare, commerce and enterprise — most of them live right now."
        />
        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {projects.map((p, i) => (
            <ProjectRow key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
