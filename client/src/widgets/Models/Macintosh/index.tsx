"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, useGLTF } from "@react-three/drei";
import model from "../../../../public/car.glb";
import styles from "./styles.module.scss";

const Macintosh = () => {
  console.log(model);
  const { scene } = useGLTF(model);
  return <primitive object={scene} />;
};

export const ModelViewer = () => {
  return (
    <Canvas
      className={styles.canvas}
      style={{
        height: "100vh",
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Macintosh />
      <OrbitControls />
    </Canvas>
  );
};
