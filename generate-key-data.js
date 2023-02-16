import fs from "fs";
import { keys as alMazrahKeys } from "./src/data/al-mazrah/locations/keys.js";
import { keys as ashikaIslandKeys } from "./src/data/ashika-island/locations/keys.js";

var writeStream = fs.createWriteStream("./src/data/keys.js");
let keys = [];

alMazrahKeys.forEach((key) => addToKeyList(key, "al-mazrah"));
ashikaIslandKeys.forEach((key) => addToKeyList(key, "ashika-island"));

function addToKeyList(key, map) {
	let entry = {
		id: key.title
			.replace(/[\s+,!;?/\\:]/g, "-")
			.replace(/[[\].']/g, "")
			.toLowerCase(),
		map,
		...key,
	};
	if (!entry.keyName) entry.keyName = `${entry.title} Key`;
	keys.push(entry);
}

writeStream.write(
	"// This file gets generated automatically.\n" +
		"// Please don't manually change anything in this file.\n" +
		"// For key data changes refer to the keys.js file in each map directory. \n\n"
);
writeStream.write("export const keys = ".concat(JSON.stringify(keys, null, 4)));
writeStream.end();
