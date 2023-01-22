import fs from "fs";
import { keys } from "./src/data/al-mazrah/locations/key-data.js";

var writeStream = fs.createWriteStream("./src/data/al-mazrah/locations/keys.js");
let keys_ids = [];

keys.forEach((key) => {
	let entry = {
		id: key.title
			.replace(/[\s+,!;?/\\:]/g, "-")
			.replace(/[[\].']/g, "")
			.toLowerCase(),
		...key,
	};
	if (!entry.keyName) entry.keyName = `${entry.title} Key`;
	keys_ids.push(entry);
});

writeStream.write("export const keys = ".concat(JSON.stringify(keys_ids, null, 4)));
writeStream.end();
