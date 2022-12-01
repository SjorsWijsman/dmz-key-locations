import fs from 'fs';
import { keys } from './src/data/key-data-base.js';

var writeStream = fs.createWriteStream("./src/data/key-data.js");
let keys_ids = [];

keys.forEach((key) => {
    let entry = {
        id: key.title.replace(/[\s+\,\!\;\?\/\:]/g,'-').replace(/[\s+\[\]\.\']/g,'').toLowerCase(), 
        title: key.title, 
        location: key.location,
        description: key.description,
        fortress: key.fortress,
        video: key.video,
        missionRequirement: key.missionRequirement,
    };
    keys_ids.push(entry);
});

writeStream.write("export const keys = ".concat(JSON.stringify(keys_ids, null, 4)));
writeStream.end();