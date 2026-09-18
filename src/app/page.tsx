"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TechStrip from "@/components/TechStrip";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Integrations from "@/components/Integrations";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), { ssr: false });

export default function Home() {
  const [, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <SmoothScroll>
      <div className="grain">
        <LoadingScreen onComplete={onComplete} />
        <CustomCursor />
        <Navigation />
        <main>
          <Hero />
          <TechStrip />
          <About />
          <Skills />
          <Integrations />
          <Projects />
          <Process />
          <Experience />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
