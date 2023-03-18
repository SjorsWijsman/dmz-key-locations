import fs from "fs";
import { maps } from "./src/data/maps.js";

const locales = ["ja-JP"];

const writeStream = fs.createWriteStream("./src/data/keys.js");
const keys = [];

Object.keys(maps).forEach((map) => {
	maps[map].locations.keys.forEach((key) => addToKeyList(key, map));
});

function addToKeyList(key, map) {
	let entry = {
		map,
		...key,
	};

	if (!entry.keyName) entry.keyName = `${entry.title} Key`;

	keys.push(entry);
}

generateKeyFile();

export async function generateKeyFile() {
	// Add translations to the keys
	for (const locale of locales) {
		let keyLocales;

		await import(`./src/data/translations/${locale}/keys.js`)
			.then((obj) => (keyLocales = obj.keys))
			.catch(() => {
				console.error(`Translations for ${locale} can not be found.`);
			});

		if (keyLocales) {
			keys.forEach((key) => {
				if (Object.keys(keyLocales).includes(key.id)) {
					if (!key.locales) key.locales = {};
					key.locales[locale] = keyLocales[key.id];
				}
			});
		}
	}

	// Write to file
	writeStream.write(
		"// This file gets generated automatically.\n" +
			"// Please don't manually change anything in this file.\n" +
			"// For key data changes refer to the keys.js file in each map directory. \n\n"
	);
	writeStream.write("export const keys = ".concat(JSON.stringify(keys, null, 2)));
	writeStream.end();
}
