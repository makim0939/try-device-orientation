import { useEffect, useState } from "react";

type DeviceOrientation = {
	alpha: number;
	beta: number;
	gamma: number;
};

export function useDeviceOrientation() {
	const [orientation, setOrientation] = useState<DeviceOrientation>({
		alpha: 0,
		beta: 0,
		gamma: 0,
	});

	useEffect(() => {
		const handleOrientation = (event: DeviceOrientationEvent) => {
			setOrientation({
				alpha: event.alpha ?? 0,
				beta: event.beta ?? 0,
				gamma: event.gamma ?? 0,
			});
		};

		window.addEventListener("deviceorientation", handleOrientation, true);
		return () => {
			window.removeEventListener("deviceorientation", handleOrientation);
		};
	}, []);

	return orientation;
}
