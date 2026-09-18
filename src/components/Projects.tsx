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
  url: string;
  img: string;
  role?: string;
};

const projects: Project[] = [
  {
    n: "01",
    name: "My Stay",
    tagline: "Rental & Accommodation Marketplace",
    desc: "A two-sided marketplace for listings, bookings, reviews, messaging and host workflows — with full authentication.",
    tech: ["Flutter", "Supabase", "Firebase", "Next.js"],
    url: "https://mystay.live",
    img: "/projects/mystay.jpg",
  },
  {
    n: "02",
    name: "Drive Flex",
    tagline: "Vehicle Rental & Transport Platform",
    desc: "Booking and fleet management with integrated payments and a streamlined reservation flow.",
    tech: ["React", "Next.js", "REST APIs", "Stripe"],
    url: "https://drive-flex.uk",
    img: "/projects/driveflex.jpg",
  },
  {
    n: "03",
    name: "TERRA — 3D Tile Studio",
    tagline: "Interactive 3D Surface Visualizer",
    desc: "A real-time 3D room visualizer for architectural tiles — preview porcelain, marble and natural stone on real spaces before you buy.",
    tech: ["Three.js", "React", "WebGL", "Next.js"],
    url: "https://3dmockup-seven.vercel.app/",
    img: "/projects/mockup3d.jpg",
  },
  {
    n: "04",
    name: "QR Dine",
    tagline: "Restaurant Ordering & POS",
    desc: "Scan-to-order with real-time kitchen timing, billing and FBR fiscal filing in one system — no app needed for guests.",
    tech: ["React", "Next.js", "Supabase", "FBR"],
    url: "https://qrdine.mystay.live",
    img: "/projects/qrdine.jpg",
  },
  {
    n: "05",
    name: "Khalish Bazar",
    tagline: "E-commerce Platform",
    desc: "A full storefront — catalogue, cart, checkout and admin — on a MERN foundation.",
    tech: ["React", "Next.js", "Node.js", "MongoDB"],
    url: "https://kkhalisbazarpk.com",
    img: "/projects/khalish.jpg",
  },
  {
    n: "06",
    name: "Horizon Hospital",
    tagline: "Hospital Management System",
    desc: "Patients, appointments, records and billing in one operational ERP built to run a real healthcare facility.",
    tech: [".NET", "SQL Server", "REST APIs"],
    url: "https://horizon-hospital.com",
    img: "/projects/horizon.jpg",
  },
  {
    n: "07",
    name: "ISOLAT ERP",
    tagline: "Enterprise ERP — at CT Products",
    desc: "A commercial AI-based ERP by CT Products. I contribute the HCM module and its integrations — FBR & PRA tax, POS, Hikvision hardware, e-commerce sync and Elasticsearch.",
    tech: [".NET", "HCM Module", "FBR · PRA", "Elasticsearch"],
    url: "https://isolaterp.com",
    img: "/projects/isolat.jpg",
    role: "Team contribution · CT Products",
  },
];

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const flip = i % 2 === 1;
  return (
    <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
          className="section-ink group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 hover:border-amber/40"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.img}
            alt={`${p.name} — ${p.tagline}`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-30" />
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[11px] text-amber backdrop-blur-sm">
            {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
        </a>
      </div>

      <div className={flip ? "lg:order-1" : ""}>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[13px] text-amber">{p.n}</span>
          <span className="h-px flex-1 bg-carbon/10" />
          {p.role && (
            <span className="chip border border-carbon/12 text-slate-2">{p.role}</span>
          )}
        </div>
        <h3 className="mt-5 font-display text-[2rem] leading-tight text-carbon lg:text-[2.6rem]">
          {p.name}
        </h3>
        <p className="mt-2 text-[15px] font-medium text-ember">{p.tagline}</p>
        <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-2">{p.desc}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="chip border border-carbon/12 text-slate-2">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-7">
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
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-paper">
      <div className="shell section-y">
        <SectionHead
          index="(04)"
          kicker="Selected Work"
          title={
            <>
              Products in the wild, <span className="grad-amber font-display italic">not case-study fiction.</span>
            </>
          }
          intro="Real, shipped systems across marketplaces, healthcare, commerce and enterprise — most of them live right now."
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
