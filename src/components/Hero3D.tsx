import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Icosahedron } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

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

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial transparent color="#00f5ff" size={0.05} sizeAttenuation depthWrite={false} opacity={0.6} />
      </points>
    </group>
  );
}

function FloatingShapes() {
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.2;
      icoRef.current.rotation.y += delta * 0.3;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x -= delta * 0.1;
      torusRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Icosahedron ref={icoRef} args={[1, 1]} position={[-3, 1, -2]}>
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.3} />
      </Icosahedron>
      <Torus ref={torusRef} args={[1.5, 0.4, 16, 100]} position={[3, -1, -3]}>
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.3} />
      </Torus>
    </>
  );
}

function CssFallbackBg() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(0,245,255,0.1) 0%, transparent 50%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          animation: "gridMove 20s linear infinite",
        }}
      />
    </div>
  );
}

export default function Hero3D() {
  const webgl = isWebGLSupported();

  return (
    <div className="absolute inset-0 z-0">
      {webgl ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="bg-transparent pointer-events-none"
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <ambientLight intensity={0.5} />
          <ParticleField />
          <FloatingShapes />
        </Canvas>
      ) : (
        <CssFallbackBg />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050a13]" />
    </div>
  );
}
