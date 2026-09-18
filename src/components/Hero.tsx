"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <div className="h-8 w-8 animate-spin-slow rounded-full border border-amber/30 border-t-amber" />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: 0.15 + i * 0.09 },
  }),
};

const metrics = [
  { k: "07", v: "Shipped products" },
  { k: "6+", v: "Years building" },
  { k: "20+", v: "Technologies" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="section-ink relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-12 lg:pt-24"
    >
      {/* atmosphere */}
      <div className="grid-fabric pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(245,165,36,0.14), transparent 62%)" }}
      />
      <div
        className="pointer-events-none absolute left-[-15%] bottom-[-10%] h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(226,122,63,0.10), transparent 65%)" }}
      />

      <div className="shell shell-wide relative z-10 grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* Left — copy */}
        <div className="max-w-2xl">
          <motion.div custom={0} variants={rise} initial="hidden" animate="show">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-mist">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
              </span>
              <span className="eyebrow text-[10px] text-paper-1/70">
                Riyan Mursaleen · Available for work
              </span>
            </span>
          </motion.div>

          <h1 className="mt-7">
            <motion.span
              custom={1}
              variants={rise}
              initial="hidden"
              animate="show"
              className="display-xl block text-paper-1"
            >
              Software that
            </motion.span>
            <motion.span
              custom={2}
              variants={rise}
              initial="hidden"
              animate="show"
              className="display-xl block text-paper-1"
            >
              looks <span className="grad-amber font-display italic">considered</span>
            </motion.span>
            <motion.span
              custom={3}
              variants={rise}
              initial="hidden"
              animate="show"
              className="display-xl block text-paper-1"
            >
              &amp; works <span className="grad-amber font-display italic">at scale.</span>
            </motion.span>
          </h1>

          <motion.p
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-md text-[15px] leading-relaxed text-mist"
          >
            A full-stack developer working in .NET, MERN and Flutter — building production
            web, mobile and business systems, from ERP and POS to the hard third-party
            integrations in between.
          </motion.p>

          <motion.div
            custom={5}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.4}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-amber px-6 py-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-amber-hi"
              >
                View selected work
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[13px] font-medium text-paper-1 transition-colors hover:border-amber/50 hover:text-amber"
              >
                Start a project
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            custom={6}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-12 flex gap-8 border-t border-white/10 pt-6"
          >
            {metrics.map((m) => (
              <div key={m.v}>
                <div className="font-display text-2xl text-paper-1">{m.k}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fog">
                  {m.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D fabric */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.2 }}
          className="relative h-[340px] w-full sm:h-[420px] lg:h-[540px]"
        >
          <Scene3D />
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 text-fog xl:flex"
      >
        <span className="eyebrow text-[9px]">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-amber/60 to-transparent" />
      </motion.a>
    </section>
  );
}
