"use client";
import { useRef, useLayoutEffect, createElement, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  blur?: boolean;
  start?: string;
};

/**
 * Editorial scroll reveal. When `stagger` is set, its DIRECT children animate
 * in sequence; otherwise the element itself rises in. Degrades to instant-visible
 * under reduced-motion or if ScrollTrigger never fires.
 */
export default function Reveal({
  children,
  as = "div",
  className = "",
  y = 28,
  x = 0,
  delay = 0,
  duration = 0.95,
  stagger,
  blur = false,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : [el];
    if (reduce || targets.length === 0) {
      gsap.set(targets, { opacity: 1, y: 0, x: 0, filter: "none" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, {
        opacity: 0,
        y,
        x,
        filter: blur ? "blur(8px)" : "none",
      });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [y, x, delay, duration, stagger, blur, start]);

  return createElement(as, { ref, className }, children);
}
