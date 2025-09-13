import { useCallback, useEffect, useState } from "react";

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
	const [doePermission, setDoePermission] = useState(false);

	const checkDoePermission = useCallback(() => {
		const DOE = DeviceOrientationEvent as any;
		DOE.requestPermission().then(async (val: string) => {
			if (val === "granted") {
				setDoePermission(true);
			} else {
				setDoePermission(false);
			}
		});
	}, []);

	useEffect(() => {
		const handleOrientation = (event: DeviceOrientationEvent) => {
			setOrientation({
				alpha: event.alpha ?? 0,
				beta: event.beta ?? 0,
				gamma: event.gamma ?? 0,
			});
		};
		if (!doePermission) checkDoePermission();
		window.addEventListener("deviceorientation", handleOrientation, true);
		return () => {
			window.removeEventListener("deviceorientation", handleOrientation);
		};
	}, [doePermission, checkDoePermission]);

	return { orientation, doePermission, checkDoePermission };
}
