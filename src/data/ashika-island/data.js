import image from "$assets/maps/ashika-island.jpg";
import { pois } from "./locations/pois";
import { keys } from "./locations/keys";
import { deadDrops } from "./locations/dead-drops";
import { spawns } from "./locations/spawns";

export const data = {
	image,
	width: 1210,
	height: 1210,
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
