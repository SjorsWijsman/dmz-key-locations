import fs from "fs";
import { keys } from "./src/data/keys.js";

const writeStream = fs.createWriteStream("./src/data/translations/keys.example.js");
const keyIds = {};

generateKeyIdsFile();

export async function generateKeyIdsFile() {
	keys.forEach((key) => {
		keyIds[key.id] = {};
	});

	writeStream.write(
		"// Read the README.md inside the data/translations folder to learn more about this file.\n"
	);
	writeStream.write("export const keys = ".concat(JSON.stringify(keyIds, null, 2)));
	writeStream.end();
}
