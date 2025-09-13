import { useCallback, useEffect, useState } from "react";
import useDeviceType from "./hooks/useDeviceType";

function App() {
	const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
	const [doePermission, setDoePermission] = useState(false);
	const deviceType = useDeviceType();

	// DeviceOrientationの使用が許可されているかを取得する
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

	const handlePermissionBtnClick = async () => {
		checkDoePermission();
	};

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

	return (
		<>
			<h1
				style={{
					transform: `translateX(${(orientation.gamma * 360) / 100}px) 
								translateY(${((orientation.beta - 30) * 360) / 100}px)`,
				}}
			>
				Try Device Orientation
			</h1>

			<ul>
				<li>{`alpha: ${orientation.alpha}`}</li>
				<li>{`beta: ${orientation.beta}`}</li>
				<li>{`gamma: ${orientation.gamma}`}</li>
			</ul>

			{deviceType === "iosOver13" && (
				<button type="button" onClick={handlePermissionBtnClick} disabled={doePermission}>
					{doePermission ? "方向の取得が許可されています" : "方向の取得を許可する"}
				</button>
			)}
		</>
	);
}

export default App;
