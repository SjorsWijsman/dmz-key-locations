import mapImage from "$assets/map.jpg";
import { POIs } from "./locations/pois";
import { keys } from "./locations/keys";
import { deadDrops } from "./locations/dead-drops";
import { spawns } from "./locations/spawns";

export const data = {
	mapImage,
	bounds: [
		[0, 0],
		[4150, 4150],
	],
	options: {
		POIs,
		gridSize: 415,
	},
	locations: {
		keys,
		misc: [
			{ title: "Dead Drops", deadDrops },
			{ title: "Spawns", spawns },
		],
	},
};
