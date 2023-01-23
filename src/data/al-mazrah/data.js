import image from "$assets/map.jpg";
import { pois } from "./locations/pois";
import { keys } from "./locations/keys";
import { deadDrops } from "./locations/dead-drops";
import { spawns } from "./locations/spawns";

export const data = {
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
			{ title: "Dead Drops", deadDrops },
			{ title: "Spawns", spawns },
		],
	},
};
