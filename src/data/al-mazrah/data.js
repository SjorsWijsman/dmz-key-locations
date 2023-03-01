import image from "$assets/maps/al-mazrah.jpg";
import { pois } from "./locations/pois.js";
import { keys } from "./locations/keys.js";
import { deadDrops } from "./locations/dead-drops.js";
import { spawns } from "./locations/spawns.js";

export const data = {
	title: "Al Mazrah",
	image,
	width: 4150,
	height: 4150,
	options: {
		pois,
		grid: {
			xTiles: 10,
			yTiles: 10,
			labels: true,
		},
	},
	locations: {
		keys,
		misc: [
			{ title: "Dead Drop", iconUrl: "../icons/markers/location-deaddrop.svg", data: deadDrops },
			{ title: "Spawn", iconUrl: "../icons/markers/location-spawn.svg", data: spawns },
		],
	},
};
