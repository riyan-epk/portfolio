"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "RIYAN MURSALEEN";
const MIN_MS = 850;
const MAX_MS = 2600;

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
    // let the 100% register, then lift the curtain
    setTimeout(() => setOpen(false), 260);
  }, []);

  useEffect(() => {
    // lock scroll while the splash is up
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
    // font fallback in case the promise stalls
    const fontTimer = setTimeout(() => (signals.current.fonts = true), 1600);

    const hardStop = setTimeout(finish, MAX_MS);

    const tick = () => {
      const elapsed = performance.now() - startRef.current;
      const s = signals.current;
      const target = (s.fonts ? 45 : 0) + (s.hero ? 45 : 0) + (s.load ? 10 : 0);
      const essentialDone = s.fonts && s.hero && elapsed >= MIN_MS;

      setPct((prev) => {
        const ceil = essentialDone ? 100 : Math.min(target, 92);
        const next = prev + (ceil - prev) * 0.08 + 0.25;
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

  // skip on click / key
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

  return (
    <AnimatePresence onExitComplete={release}>
      {open && (
        <motion.div
          key="splash"
          className="grain fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-ink"
          exit={{ y: "-101%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* soft amber core-glow that grows with progress */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 640,
              height: 640,
              background: "radial-gradient(circle, rgba(245,165,36,0.16), transparent 62%)",
              opacity: 0.3 + (pct / 100) * 0.6,
              transform: `translate(-50%,-50%) scale(${0.7 + (pct / 100) * 0.4})`,
              transition: "opacity 0.3s, transform 0.3s",
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: shown >= 100 ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center gap-7"
          >
            {/* Monogram line-draw */}
            <svg width="76" height="76" viewBox="0 0 100 100" fill="none">
              <motion.rect
                x="6" y="6" width="88" height="88" rx="20"
                stroke="rgba(245,165,36,0.35)" strokeWidth="1.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
              />
              <motion.path
                d="M32 70 V32 H50 a11 11 0 0 1 0 22 H36 M50 54 L68 70"
                stroke="#f5a524" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
              />
            </svg>

            {/* Name, character reveal */}
            <div className="flex flex-wrap justify-center gap-x-[0.12em] font-display text-[15px] tracking-[0.32em] text-paper-1/90 sm:text-lg">
              {NAME.split("").map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: ch === " " ? 0 : 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.035 }}
                >
                  {ch === " " ? " " : ch}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="eyebrow text-fog"
            >
              Full-Stack · Systems · Integrations
            </motion.p>
          </motion.div>

          {/* Progress */}
          <div className="absolute bottom-10 left-0 right-0 mx-auto flex w-[min(78vw,320px)] items-center justify-between gap-4">
            <div className="relative h-px flex-1 bg-white/12">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber to-copper"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-[11px] tabular-nums text-mist">
              {String(shown).padStart(3, "0")}
            </span>
          </div>

          <span className="eyebrow absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-fog/60">
            click to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
