"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Riyan", "Mursaleen"];
const MIN_MS = 2400;
const MAX_MS = 3800;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);
  const [open, setOpen] = useState(true);
  const finishedRef = useRef(false);

  const signals = useRef({ fonts: false, hero: false, load: false });
  const startRef = useRef(performance.now());
  const rafRef = useRef(0);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPct(100);
    setTimeout(() => setOpen(false), 560);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop?.();

    const onHero = () => (signals.current.hero = true);
    const onLoad = () => (signals.current.load = true);
    window.addEventListener("hero:ready", onHero);
    window.addEventListener("load", onLoad);
    if (document.readyState === "complete") signals.current.load = true;

    (document as Document & { fonts?: FontFaceSet }).fonts?.ready.then(() => {
      signals.current.fonts = true;
    });
    const fontTimer = setTimeout(() => (signals.current.fonts = true), 1600);
    const hardStop = setTimeout(finish, MAX_MS);

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const s = signals.current;
      const target = (s.fonts ? 45 : 0) + (s.hero ? 45 : 0) + (s.load ? 10 : 0);
      const essentialDone = s.fonts && s.hero && elapsed >= MIN_MS;

      setPct((prev) => {
        const ceil = essentialDone ? 100 : Math.min(target, 92);
        const next = prev + (ceil - prev) * 0.08 + 0.35;
        return Math.min(next, ceil);
      });

      if (essentialDone) {
        finish();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(hardStop);
      clearTimeout(fontTimer);
      window.removeEventListener("hero:ready", onHero);
      window.removeEventListener("load", onLoad);
    };
  }, [finish]);

  useEffect(() => {
    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [finish]);

  const release = () => {
    document.documentElement.style.overflow = "";
    window.__lenis?.start?.();
    onComplete();
  };

  const shown = Math.round(pct);
  const done = shown >= 100;

  return (
    <AnimatePresence onExitComplete={release}>
      {open && (
        <motion.div
          key="splash"
          className="grain fixed inset-0 z-[200] overflow-hidden bg-ink"
          exit={{ y: "-101%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* core-glow that grows with progress */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 720,
              height: 720,
              background: "radial-gradient(circle, rgba(245,165,36,0.16), transparent 60%)",
              opacity: 0.25 + (pct / 100) * 0.6,
              transform: `translate(-50%,-50%) scale(${0.65 + (pct / 100) * 0.5})`,
              transition: "opacity 0.4s, transform 0.4s",
            }}
          />

          {/* center */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: done ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
          >
            {/* monogram with drawing ring + rotating arc */}
            <div className="relative grid h-24 w-24 place-items-center">
              <svg className="absolute inset-0" viewBox="0 0 100 100" fill="none">
                <motion.circle
                  cx="50" cy="50" r="47"
                  stroke="rgba(245,165,36,0.18)" strokeWidth="1"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="50" cy="50" r="47"
                  stroke="#f5a524" strokeWidth="1.5" strokeLinecap="round"
                  strokeDasharray="30 265"
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 360, opacity: 1 }}
                  transition={{ rotate: { duration: 2.4, ease: "linear", repeat: Infinity }, opacity: { duration: 0.6 } }}
                  style={{ transformOrigin: "50% 50%" }}
                />
              </svg>
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="grid h-14 w-14 place-items-center rounded-2xl bg-amber font-display text-2xl font-bold text-ink"
              >
                R
              </motion.span>
            </div>

            {/* name — mask wipe reveal per word */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 overflow-hidden">
              {WORDS.map((w, i) => (
                <span key={w} className="overflow-hidden py-1">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.12 }}
                    className="block font-display text-2xl tracking-tight text-paper-1 sm:text-3xl"
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="eyebrow text-fog"
            >
              Full-Stack · Systems · Integrations
            </motion.p>
          </motion.div>

          {/* bottom progress bar */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell flex items-end justify-between pb-8">
              <span className="eyebrow text-[10px] text-fog">
                {done ? "Ready" : "Loading"}
              </span>
              <span className="font-display text-5xl leading-none text-paper-1/90 tabular-nums sm:text-6xl">
                {String(shown).padStart(2, "0")}
                <span className="text-amber">%</span>
              </span>
            </div>
            <div className="h-[2px] w-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-amber to-copper"
                style={{ width: `${pct}%`, transition: "width 0.2s linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
