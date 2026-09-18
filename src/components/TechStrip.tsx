"use client";

const tech = [
  ".NET", "ASP.NET Core", "C#", "React", "Next.js", "Node.js", "Express",
  "Flutter", "Dart", "TypeScript", "SQL Server", "PostgreSQL", "MongoDB",
  "Supabase", "Firebase", "REST APIs", "Elasticsearch", "Stripe", "FBR",
  "PRA", "Hikvision",
];

export default function TechStrip() {
  const row = [...tech, ...tech];
  return (
    <div className="section-ink relative overflow-hidden border-y border-white/8 py-5">
      <div className="mask-fade-x flex">
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {row.map((t, i) => (
            <li key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-mono text-[13px] tracking-wide text-mist">
                {t}
              </span>
              <span className="h-1 w-1 rounded-full bg-amber/50" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
