"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function MyCamera() {
	const { camera } = useThree();

	useEffect(() => {
		camera.position.set(-5, 2.5, 5);
		camera.lookAt(0, 1, 0);
	}, [camera]);

	return <PerspectiveCamera makeDefault zoom={0.75} />;
}
