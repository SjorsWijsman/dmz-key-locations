# How to add a new language file for keys:

- Create a new folder according to the following language codes: http://www.lingoes.net/en/translator/langcode.htm.
- Run `npm run generate-example-translation-file` in the root folder to get a template file with all the key ids (so you don't have to copy this manually).
- Copy the `keys.example.js` file created in the `/translations` folder to your new language folder.
- Rename the file to `keys.js`.
- Add translations. Available key data to translate: `title`, `keyName`, `description`.
- Example:
  ```
  "tsuki-castle": {
  	title: "ツキ・キャッスル",
  	keyName: "ツキ・キャッスル隠れ家の鍵",
  },
  ```
