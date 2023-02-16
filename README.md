# dmz-key-locations

Interactive map for DMZ key unlock locations.

![Powered by Vercel](https://github.com/SjorsWijsman/dmz-key-locations/blob/main/src/assets/powered-by-vercel.svg?raw=true)

![Banner](https://github.com/SjorsWijsman/dmz-key-locations/blob/main/static/banner.jpg?raw=true)

## How to run the map locally

- Download Node from [nodejs.org](https://nodejs.org/en/).
- Clone this project to your local environment.
- Open a terminal in the root folder of the project (`/dmz-key-locations`).
- Run `npm install` from this terminal to install the project dependencies.
- When this has completed, run `npm run dev -- --open` to start the local server. This page will automatically update on changes.
- For more info on how to use Svelte: [svelte.dev](https://svelte.dev/).

## How to add new key locations

- All the data for the keys is found in the `dmz-key-locations/src/data/al-mazrah/locations/key-data.js` file.
- Add a new key entry by using the following variables:
  - `title` - **String** - Required - _Has to be unique; recommended to add the sector if there are conflicts e.g. [A0]._
  - `keyName` - **String** - _When the name of the key isn't "<title> Key" you aa custom key name is added._
  - `location` - **Object with x & y coordinates** - Required - _Map coordinates are shown in the bottom left._
  - `description` - **List of Strings** - _Every list item is a paragraph, supports html tags._
  - `video` - **String** - _Link to a video on YouTube, only uses the video id, e.g. `https://www.youtube.com/watch?v=xvFZjo5PgG0` = `xvFZjo5PgG0`_
  - `tags` - **List of Strings** - _Accepted values: `"mission"`, `"fortress"`_
- Regenerate the `keys.js` file by running `npm run generate-key-data`. This automatically generates ids for every key location, used as a unique identifier in the application.
