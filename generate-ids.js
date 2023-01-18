import fs from 'fs';
import { keys } from './src/data/key-data-base.js';

var writeStream = fs.createWriteStream("./src/data/keys.js");
let keys_ids = [];

keys.forEach((key) => {
  let entry = {
    id: key.title
      .replace(/[\s+\,\!\;\?\/\\\:]/g,'-')
      .replace(/[\[\]\.\']/g,'')
      .toLowerCase(), 
    ...key,
  };
  keys_ids.push(entry);
});

writeStream.write("export const keys = ".concat(JSON.stringify(keys_ids, null, 4)));
writeStream.end();