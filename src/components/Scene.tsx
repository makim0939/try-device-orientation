"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MyCamera from "./MyCamera";
import { RoomPrototype } from "./RoomPrototype";
import { useDeviceOrientation } from "../hooks/useDeviceOrientation";

export default function Scene() {
	const orientation = useDeviceOrientation();
	return (
		<div className="  w-[100vw] h-[100vh] md:h-screen">
			<Canvas shadows>
				<Suspense fallback={null}>
					<MyCamera />
					<ambientLight position={[0, 5, 0]} intensity={1} />
					<pointLight position={[0, 5, 1]} intensity={10} />
					<RoomPrototype
						rotation={[
							Math.PI * (((orientation.beta - 30) / 90) * 0.075),
							Math.PI * ((orientation.gamma / 90) * 0.25),
							Math.PI * (((orientation.beta - 30) / 90) * 0.075),
						]}
					/>
				</Suspense>
			</Canvas>
		</div>
	);
}
