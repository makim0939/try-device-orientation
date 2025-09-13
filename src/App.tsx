import { useDeviceOrientation } from "./hooks/useDeviceOrientation";
import useDeviceType from "./hooks/useDeviceType";

function App() {
	const deviceType = useDeviceType();
	const { orientation, doePermission, checkDoePermission } = useDeviceOrientation();

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
				<button type="button" onClick={() => checkDoePermission()} disabled={doePermission}>
					{doePermission ? "方向の取得が許可されています" : "方向の取得を許可する"}
				</button>
			)}
		</>
	);
}

export default App;
