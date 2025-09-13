import { useCallback, useEffect, useState } from "react";

export function useDoePermission() {
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
		if (!doePermission) checkDoePermission();
	}, [doePermission, checkDoePermission]);

	return { doePermission, checkDoePermission };
}
