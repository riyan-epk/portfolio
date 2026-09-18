"use client";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const EMAIL = "ryaan.epk@gmail.com";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-ink relative overflow-hidden border-t border-white/10">
      <div className="grid-fabric pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber font-display text-base font-bold text-ink">R</span>
              <span className="font-display text-lg font-semibold text-paper-1">Riyan Mursaleen</span>
            </a>
            <p className="mt-6 max-w-md font-display text-2xl leading-snug text-paper-1/90 lg:text-[1.7rem]">
              Let&apos;s build something that <span className="grad-amber italic">outlasts the pitch.</span>
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-[13px] text-mist transition-colors hover:text-amber"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              {EMAIL}
            </a>
          </div>

          <nav className="flex flex-col gap-3 lg:items-end">
            <span className="eyebrow mb-1 text-fog">Navigate</span>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="link-underline text-[15px] text-mist hover:text-amber">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] text-fog">© {year} Riyan Mursaleen. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[12px] text-fog">.NET · MERN · Flutter</span>
            <a href="#home" className="group inline-flex items-center gap-1.5 font-mono text-[12px] text-mist hover:text-amber">
              Back to top
              <svg className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
