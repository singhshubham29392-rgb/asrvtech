import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Octahedron } from "@react-three/drei";

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function AbstractShape() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.5;
      ref.current.rotation.y += delta * 0.3;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Octahedron ref={ref} args={[1, 0]} scale={2}>
      <meshStandardMaterial
        color="#0ea5e9"
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </Octahedron>
  );
}

function CssFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-48 h-48"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <div className="absolute inset-0 rounded-full border border-cyan-500/40 animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute inset-4 rounded-full border border-purple-500/40 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.3s" }} />
        <div className="absolute inset-8 rounded-full border border-blue-500/40 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.6s" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-cyan-400 rounded-lg rotate-45" style={{ boxShadow: "0 0 20px rgba(0,245,255,0.4)" }} />
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const points = [
    "Quality over quantity in every build",
    "Fast execution with modern tech stack",
    "Scalable architectures from day one",
    "Client-focused tailored solutions",
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">
              About <span className="text-cyan-400">ASRVTech</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are a young, driven startup building high-quality digital products.
              Our mission is to engineer precise, powerful, and scalable solutions that
              propel businesses into the future. From robust backend systems to immersive
              frontend experiences, we deliver excellence.
            </p>

            <ul className="space-y-4">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
                  <span className="font-medium">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="flex-1 w-full max-w-md aspect-square relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,245,255,0.1)] rounded-2xl pointer-events-none z-10" />
            {isWebGLSupported() ? (
              <Canvas camera={{ position: [0, 0, 5] }} gl={{ antialias: false }}>
                <ambientLight intensity={1} />
                <directionalLight position={[2, 2, 2]} intensity={2} color="#00f5ff" />
                <directionalLight position={[-2, -2, -2]} intensity={2} color="#7c3aed" />
                <AbstractShape />
              </Canvas>
            ) : (
              <CssFallback />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
