"use client";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-ink relative overflow-hidden border-t border-white/10">
      <div className="grid-fabric pointer-events-none absolute inset-0 opacity-30" />
      <div className="shell relative py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber font-display text-base font-bold text-ink">R</span>
              <span className="font-display text-lg font-semibold text-paper-1">Riyan Mursaleen</span>
            </a>
            <p className="mt-5 max-w-sm font-display text-2xl leading-snug text-paper-1/90">
              Let&apos;s build something that <span className="grad-amber italic">outlasts the pitch.</span>
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="link-underline text-[14px] text-mist hover:text-amber">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] text-fog">© {year} Riyan Mursaleen. All rights reserved.</p>
          <p className="font-mono text-[12px] text-fog">
            .NET · MERN · Flutter — engineered with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
