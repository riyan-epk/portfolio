"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop?.();
    else window.__lenis?.start?.();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // dark = over hero (light content); light pill = scrolled into paper body
  const dark = !scrolled;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <nav
          className={`grid w-full max-w-[1240px] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border px-3 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border-[color:var(--line-l)] bg-paper-1/95 shadow-[0_10px_40px_rgba(20,22,28,0.14)] backdrop-blur-xl"
              : "border-white/10 bg-white/[0.03] backdrop-blur-md"
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber font-display text-base font-bold text-ink">
              R
            </span>
            <span
              className={`hidden font-display text-[15px] font-semibold tracking-tight sm:block ${
                dark ? "text-paper-1" : "text-carbon"
              }`}
            >
              Riyan Mursaleen
            </span>
          </a>

          <div className="hidden items-center justify-center gap-0.5 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  dark
                    ? "text-mist hover:bg-white/5 hover:text-amber"
                    : "text-slate-2 hover:bg-carbon/5 hover:text-carbon"
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Magnetic strength={0.2} className="hidden md:inline-block">
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-[12.5px] font-semibold transition-colors ${
                  dark
                    ? "bg-white/10 text-paper-1 hover:bg-amber hover:text-ink"
                    : "bg-ink text-paper-1 hover:bg-amber hover:text-ink"
                }`}
              >
                Let&apos;s talk
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen(!open)}
              className={`grid h-10 w-10 place-items-center rounded-lg lg:hidden ${
                dark ? "text-paper-1" : "text-carbon"
              }`}
              aria-label="Toggle menu"
            >
              <div className="flex w-5 flex-col gap-[5px]">
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`block h-[1.5px] bg-current transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grain fixed inset-0 z-[80] bg-ink lg:hidden"
          >
            <div className="flex h-full flex-col justify-center gap-1 px-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4 }}
                  className="flex items-baseline gap-4 border-b border-white/8 py-4"
                >
                  <span className="font-mono text-[11px] text-amber">0{i + 1}</span>
                  <span className="font-display text-3xl text-paper-1">{l.label}</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.06, duration: 0.4 }}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-amber px-7 py-3.5 font-semibold text-ink"
              >
                Let&apos;s work together
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
