// import image from "$assets/maps/ashika-island.jpg";
import { pois } from "./locations/pois.js";
import { keys } from "./locations/keys.js";
import { deadDrops } from "./locations/dead-drops.js";
import { spawns } from "./locations/spawns.js";

export const data = {
	title: "Ashika Island",
	image:
		"https://raw.githubusercontent.com/SjorsWijsman/dmz-key-locations/main/src/assets/maps/ashika-island.jpg",
	width: 1210,
	height: 1210,
	options: {
		pois,
		grid: {
			xTiles: 10,
			yTiles: 10,
			labels: true,
		},
		defaultZoom: -1,
	},
	locations: {
		keys,
		misc: [
			{ title: "Dead Drop", iconUrl: "../icons/markers/location-deaddrop.svg", data: deadDrops },
			{ title: "Spawn", iconUrl: "../icons/markers/location-spawn.svg", data: spawns },
		],
	},
};
