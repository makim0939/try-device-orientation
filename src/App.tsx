import Scene from "./components/Scene";
import useDeviceType from "./hooks/useDeviceType";
import { useDoePermission } from "./hooks/useDoePermission";

function App() {
	const deviceType = useDeviceType();
	const { doePermission, checkDoePermission } = useDoePermission();

	return (
		<>
			<header className="absolute mt-16 ml-4">
				<h1 className=" text-5xl font-bold">
					まきむら<span className="text-4xl">の</span>
					<br />
					ポートフォリオ
				</h1>
			</header>
			<Scene />
			{deviceType === "iosOver13" && (
				<button type="button" onClick={() => checkDoePermission()} disabled={doePermission}>
					{doePermission ? "方向の取得が許可されています" : "方向の取得を許可する"}
				</button>
			)}
			{/* <h1
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
			</ul> */}
		</>
	);
}

export default App;
