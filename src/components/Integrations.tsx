"use client";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const sources = [
  { y: 70, label: "ERP · POS" },
  { y: 160, label: "Payments · Stripe" },
  { y: 250, label: "FBR · PRA — Tax" },
  { y: 340, label: "Hikvision — Hardware" },
];
const dests = [
  { y: 110, label: "SQL · PostgreSQL" },
  { y: 205, label: "Elasticsearch" },
  { y: 300, label: "Firebase · Supabase" },
];

const CX = 500;
const CY = 205;

function pathFrom(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

const layers = [
  "Client Application",
  "API Layer",
  "Business Logic",
  "External Services",
  "Data Layer",
];

export default function Integrations() {
  return (
    <section id="integrations" className="bg-paper">
      <div className="shell py-24 lg:py-32">
        <SectionHead
          index="(05)"
          kicker="Integrations"
          title={
            <>
              The hard part isn&apos;t the app — it&apos;s{" "}
              <span className="grad-amber font-display italic">everything it talks to.</span>
            </>
          }
          intro="Tax authorities, payment rails, security hardware and enterprise data — I make disparate systems move data reliably through a single, observable core."
        />

        <Reveal className="mt-14 overflow-hidden rounded-3xl border border-white/10 section-ink">
          <div className="border-b border-white/8 px-6 py-4">
            <span className="font-mono text-[12px] text-mist">integration-fabric · live data flow</span>
          </div>
          <div className="p-4 sm:p-8">
            <svg viewBox="0 0 1000 410" className="w-full" role="img" aria-label="Integration data flow diagram">
              <defs>
                {sources.map((s, i) => (
                  <path key={`sp${i}`} id={`sp${i}`} d={pathFrom(250, s.y + 22, CX - 70, CY)} fill="none" />
                ))}
                {dests.map((d, i) => (
                  <path key={`dp${i}`} id={`dp${i}`} d={pathFrom(CX + 70, CY, 750, d.y + 22)} fill="none" />
                ))}
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f5a524" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f5a524" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* connector paths */}
              {sources.map((_, i) => (
                <use key={`us${i}`} href={`#sp${i}`} stroke="rgba(245,165,36,0.22)" strokeWidth="1.5" />
              ))}
              {dests.map((_, i) => (
                <use key={`ud${i}`} href={`#dp${i}`} stroke="rgba(245,165,36,0.22)" strokeWidth="1.5" />
              ))}

              {/* travelling pulses */}
              {sources.map((_, i) => (
                <circle key={`ps${i}`} r="4" fill="#ffc24b">
                  <animateMotion dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                    <mpath href={`#sp${i}`} />
                  </animateMotion>
                </circle>
              ))}
              {dests.map((_, i) => (
                <circle key={`pd${i}`} r="4" fill="#ffc24b">
                  <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${1 + i * 0.4}s`}>
                    <mpath href={`#dp${i}`} />
                  </animateMotion>
                </circle>
              ))}

              {/* source nodes */}
              {sources.map((s, i) => (
                <g key={`s${i}`}>
                  <rect x="60" y={s.y} width="190" height="44" rx="12" fill="#14171f" stroke="rgba(255,255,255,0.12)" />
                  <circle cx="82" cy={s.y + 22} r="4" fill="#e27a3f" />
                  <text x="100" y={s.y + 27} fill="#c9ccd4" fontSize="14" fontFamily="var(--font-mono)">{s.label}</text>
                </g>
              ))}

              {/* core */}
              <circle cx={CX} cy={CY} r="90" fill="url(#coreGlow)" />
              <circle cx={CX} cy={CY} r="56" fill="#0d0f15" stroke="#f5a524" strokeWidth="1.5" />
              <circle cx={CX} cy={CY} r="56" fill="none" stroke="rgba(245,165,36,0.25)" strokeWidth="1">
                <animate attributeName="r" values="56;74;56" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x={CX} y={CY - 4} fill="#ffc24b" fontSize="15" fontFamily="var(--font-mono)" textAnchor="middle">CORE</text>
              <text x={CX} y={CY + 16} fill="#9aa0ae" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">.NET · Node</text>

              {/* dest nodes */}
              {dests.map((d, i) => (
                <g key={`d${i}`}>
                  <rect x="750" y={d.y} width="190" height="44" rx="12" fill="#14171f" stroke="rgba(255,255,255,0.12)" />
                  <circle cx="772" cy={d.y + 22} r="4" fill="#f5a524" />
                  <text x="790" y={d.y + 27} fill="#c9ccd4" fontSize="14" fontFamily="var(--font-mono)">{d.label}</text>
                </g>
              ))}

              <text x="155" y="30" fill="#62697a" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">SOURCES</text>
              <text x="845" y="30" fill="#62697a" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">DESTINATIONS</text>
            </svg>
          </div>

          {/* architecture layer legend */}
          <div className="grid grid-cols-2 gap-px border-t border-white/8 bg-white/5 sm:grid-cols-5">
            {layers.map((l, i) => (
              <div key={l} className="bg-ink px-4 py-4">
                <div className="font-mono text-[11px] text-amber">L{i + 1}</div>
                <div className="mt-1 text-[13px] text-paper-1">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
