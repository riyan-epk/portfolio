"use client";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const sources = [
  { y: 88, label: "ERP · POS" },
  { y: 218, label: "Payments · Stripe" },
  { y: 348, label: "FBR · PRA — Tax" },
  { y: 478, label: "Hikvision" },
];
const dests = [
  { y: 150, label: "SQL · Postgres" },
  { y: 285, label: "Elasticsearch" },
  { y: 420, label: "Firebase" },
];

const CX = 500;
const CY = 290;

function pathFrom(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

export default function Integrations() {
  return (
    <section id="integrations" className="bg-paper">
      <div className="shell section-y">
        <SectionHead
          index="(03)"
          kicker="Integrations"
          align="center"
          title={
            <>
              The hard part isn&apos;t the app — it&apos;s{" "}
              <span className="grad-amber font-display italic">everything it talks to.</span>
            </>
          }
          intro="Payments, tax authorities, hardware and enterprise data — moving reliably through one observable core."
        />

        <Reveal className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-white/10 section-ink">
          <div className="border-b border-white/8 px-5 py-4 sm:px-6">
            <span className="font-mono text-[12px] text-mist">integration-fabric · live data flow</span>
          </div>
          <div className="p-4 sm:p-8">
            <svg viewBox="0 0 1000 580" className="w-full" role="img" aria-label="Integration data flow diagram">
              <defs>
                {sources.map((s, i) => (
                  <path key={`sp${i}`} id={`sp${i}`} d={pathFrom(250, s.y + 22, CX - 74, CY)} fill="none" />
                ))}
                {dests.map((d, i) => (
                  <path key={`dp${i}`} id={`dp${i}`} d={pathFrom(CX + 74, CY, 750, d.y + 22)} fill="none" />
                ))}
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#f5a524" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f5a524" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* connector paths */}
              {[...sources, ...dests].map((_, i) => (
                <use
                  key={`u${i}`}
                  href={`#${i < sources.length ? "sp" + i : "dp" + (i - sources.length)}`}
                  stroke="rgba(245,165,36,0.22)"
                  strokeWidth="1.5"
                />
              ))}

              {/* travelling pulses */}
              {sources.map((_, i) => (
                <circle key={`ps${i}`} r="4.5" fill="#ffc24b">
                  <animateMotion dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}>
                    <mpath href={`#sp${i}`} />
                  </animateMotion>
                </circle>
              ))}
              {dests.map((_, i) => (
                <circle key={`pd${i}`} r="4.5" fill="#ffc24b">
                  <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" begin={`${1 + i * 0.4}s`}>
                    <mpath href={`#dp${i}`} />
                  </animateMotion>
                </circle>
              ))}

              {/* source nodes */}
              {sources.map((s, i) => (
                <g key={`s${i}`}>
                  <rect x="56" y={s.y} width="194" height="44" rx="12" fill="#14171f" stroke="rgba(255,255,255,0.12)" />
                  <circle cx="80" cy={s.y + 22} r="4" fill="#e27a3f" />
                  <text x="98" y={s.y + 27} fill="#e6e8ec" fontSize="15" fontFamily="var(--font-mono)">{s.label}</text>
                </g>
              ))}

              {/* core */}
              <circle cx={CX} cy={CY} r="110" fill="url(#coreGlow)" />
              <circle cx={CX} cy={CY} r="60" fill="#0d0f15" stroke="#f5a524" strokeWidth="1.5" />
              <circle cx={CX} cy={CY} r="60" fill="none" stroke="rgba(245,165,36,0.25)" strokeWidth="1">
                <animate attributeName="r" values="60;84;60" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x={CX} y={CY - 4} fill="#ffc24b" fontSize="16" fontFamily="var(--font-mono)" textAnchor="middle">CORE</text>
              <text x={CX} y={CY + 17} fill="#9aa0ae" fontSize="12" fontFamily="var(--font-mono)" textAnchor="middle">.NET · Node</text>

              {/* dest nodes */}
              {dests.map((d, i) => (
                <g key={`d${i}`}>
                  <rect x="750" y={d.y} width="194" height="44" rx="12" fill="#14171f" stroke="rgba(255,255,255,0.12)" />
                  <circle cx="774" cy={d.y + 22} r="4" fill="#f5a524" />
                  <text x="792" y={d.y + 27} fill="#e6e8ec" fontSize="15" fontFamily="var(--font-mono)">{d.label}</text>
                </g>
              ))}

              <text x="153" y="42" fill="#62697a" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle">SOURCES</text>
              <text x="847" y="42" fill="#62697a" fontSize="13" fontFamily="var(--font-mono)" textAnchor="middle">DESTINATIONS</text>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
