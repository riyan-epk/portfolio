"use client";
import { useEffect, useRef, useState } from "react";

type Mode = "default" | "link" | "view";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [hidden, setHidden] = useState(true);

  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (hidden) setHidden(false);

      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='view']")) setMode("view");
      else if (
        el.closest("a") ||
        el.closest("button") ||
        el.closest("[role='button']") ||
        el.closest("input") ||
        el.closest("textarea") ||
        el.closest("[data-cursor='link']")
      )
        setMode("link");
      else setMode("default");
    };

    const leave = () => setHidden(true);
    const enter = () => setHidden(false);

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf.current);
    };
  }, [hidden]);

  return (
    <>
      <div
        ref={ringRef}
        className={`cursor-ring ${mode === "link" ? "is-link" : ""} ${
          mode === "view" ? "is-view" : ""
        } ${hidden ? "is-hidden" : ""}`}
      >
        {mode === "view" && (
          <span className="grid h-full w-full place-items-center font-mono text-[9px] font-semibold tracking-[0.2em]">
            VIEW
          </span>
        )}
      </div>
      <div ref={dotRef} className={`cursor-dot ${hidden || mode !== "default" ? "is-hidden" : ""}`} />
    </>
  );
}
