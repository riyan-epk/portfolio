"use client";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, QuadraticBezierLine, Text } from "@react-three/drei";
import * as THREE from "three";

const AMBER = "#f5a524";
const COPPER = "#e27a3f";
const CORE = "#ffc24b";

type Vec = [number, number, number];

const SOURCES: { pos: Vec; label: string }[] = [
  { pos: [-2.45, 1.25, 0], label: ".NET" },
  { pos: [-2.7, 0.0, 0.2], label: "SQL" },
  { pos: [-2.4, -1.25, -0.1], label: "Flutter" },
];
const DESTS: { pos: Vec; label: string }[] = [
  { pos: [2.45, 1.25, 0], label: "Stripe" },
  { pos: [2.7, 0.0, 0.2], label: "FBR" },
  { pos: [2.4, -1.25, -0.1], label: "REST" },
];

/** A glowing satellite node with an orbiting ring + label. */
function Node({ pos, label, side }: { pos: Vec; label: string; side: "in" | "out" }) {
  const ref = useRef<THREE.Group>(null);
  const seed = useMemo(() => Math.random() * 10, []);
  useFrame((s) => {
    if (!ref.current) return;
    ref.current.position.y = pos[1] + Math.sin(s.clock.elapsedTime * 0.6 + seed) * 0.08;
  });
  return (
    <group ref={ref} position={pos}>
      <mesh>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color={side === "in" ? COPPER : AMBER}
          emissive={side === "in" ? COPPER : AMBER}
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.006, 8, 40]} />
        <meshBasicMaterial color={AMBER} transparent opacity={0.35} />
      </mesh>
      <Text
        position={[0, -0.44, 0]}
        fontSize={0.17}
        color="#eef0f4"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.03}
        outlineWidth={0.004}
        outlineColor="#0a0b0f"
      >
        {label}
      </Text>
    </group>
  );
}

/** The integration core — layered glowing icosahedron with a slow rotating cage. */
function Core() {
  const inner = useRef<THREE.Mesh>(null);
  const cage = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (inner.current) inner.current.rotation.y = t * 0.25;
    if (cage.current) {
      cage.current.rotation.y = -t * 0.15;
      cage.current.rotation.x = t * 0.08;
    }
    if (mat.current) mat.current.emissiveIntensity = 0.7 + Math.sin(t * 1.6) * 0.25;
  });
  return (
    <group>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshStandardMaterial
          ref={mat}
          color={CORE}
          emissive={CORE}
          emissiveIntensity={0.8}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={cage}>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.22} />
      </mesh>
      <Text position={[0, -1.25, 0]} fontSize={0.17} color="#f4f1e9" anchorX="center" letterSpacing={0.06}>
        CORE
      </Text>
    </group>
  );
}

/** Connector + travelling pulse. dir "in" flows node→core, "out" flows core→node. */
function Link({ from, to, dir, delay }: { from: Vec; to: Vec; dir: "in" | "out"; delay: number }) {
  const start = dir === "in" ? from : to;
  const end = dir === "in" ? to : from;
  const mid = useMemo<Vec>(() => {
    const m = new THREE.Vector3(...start).lerp(new THREE.Vector3(...end), 0.5);
    m.y += 0.5;
    m.z += 0.3;
    return [m.x, m.y, m.z];
  }, [start, end]);

  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...start),
        new THREE.Vector3(...mid),
        new THREE.Vector3(...end)
      ),
    [start, mid, end]
  );

  const pulse = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!pulse.current) return;
    const t = ((s.clock.elapsedTime * 0.32 + delay) % 1 + 1) % 1;
    const p = curve.getPointAt(t);
    pulse.current.position.set(p.x, p.y, p.z);
    const scale = 0.6 + Math.sin(t * Math.PI) * 0.9;
    pulse.current.scale.setScalar(scale);
    (pulse.current.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI) * 0.9 + 0.1;
  });

  return (
    <group>
      <QuadraticBezierLine
        start={start}
        end={end}
        mid={mid}
        color={AMBER}
        lineWidth={1}
        transparent
        opacity={0.16}
      />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={CORE} transparent />
      </mesh>
    </group>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const count = 60;
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 9;
      a[i * 3 + 1] = (Math.random() - 0.5) * 5;
      a[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return a;
  }, []);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={AMBER} size={0.02} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function Fabric({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = useRef(new THREE.Vector2());

  useFrame((s, dt) => {
    if (!group.current) return;
    target.current.lerp(pointer, Math.min(1, dt * 3));
    group.current.rotation.y = target.current.x * 0.28 + Math.sin(s.clock.elapsedTime * 0.1) * 0.04;
    group.current.rotation.x = -target.current.y * 0.18;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.4}>
        <Core />
      </Float>
      {SOURCES.map((n, i) => (
        <group key={`s${i}`}>
          <Node pos={n.pos} label={n.label} side="in" />
          <Link from={n.pos} to={[0, 0, 0]} dir="in" delay={i * 0.33} />
        </group>
      ))}
      {DESTS.map((n, i) => (
        <group key={`d${i}`}>
          <Node pos={n.pos} label={n.label} side="out" />
          <Link from={n.pos} to={[0, 0, 0]} dir="out" delay={i * 0.33 + 0.15} />
        </group>
      ))}
      {!reduced && <Dust />}
    </group>
  );
}

function Signal() {
  // Tell the splash the hero is live after first committed frame.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      window.dispatchEvent(new CustomEvent("hero:ready"))
    );
    return () => cancelAnimationFrame(id);
  }, []);
  return null;
}

export default function Scene3D() {
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches
    );
  }, []);

  // Pause the render loop while the hero is scrolled out of view (perf).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0.15, 8.4], fov: 40 }}
        dpr={[1, reduced ? 1.25 : 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 5]} intensity={0.7} />
        <pointLight position={[0, 0, 3]} intensity={1.4} color={AMBER} distance={12} />
        <pointLight position={[-4, 2, 2]} intensity={0.5} color={COPPER} />
        <Suspense fallback={null}>
          <Fabric reduced={reduced} />
          <Signal />
        </Suspense>
      </Canvas>
    </div>
  );
}
