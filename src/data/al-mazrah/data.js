import image from "$assets/maps/al-mazrah.jpg";
import { pois } from "./locations/pois";
import { keys } from "./locations/keys";
import { deadDrops } from "./locations/dead-drops";
import { spawns } from "./locations/spawns";

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
			{ title: "Dead Drop", iconUrl: "icons/markers/location-deaddrop.svg", data: deadDrops },
			{ title: "Spawn", iconUrl: "icons/markers/location-spawn.svg", data: spawns },
		],
	},
};
