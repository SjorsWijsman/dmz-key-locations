# dmz-key-locations

Interactive map for DMZ key unlock locations.

## How to run the map locally
- Download Node from [nodejs.org](https://nodejs.org/en/).
- Open a terminal in the root folder of the project (`/dmz-key-locations`).
- Run `npm install` from this terminal to install the project dependencies.
- When this has completed, run `npm run dev -- --open` to start the local server. This page will automatically update on changes.
- For more info on how to use Svelte: [svelte.dev](https://svelte.dev/).

## How to add new locations
- All the data for the keys is found in the `dmz-key-locations/src/data/key-data-base.js` file.
- Add a new key entry by using the following variables:
  - `title` - **String** - Required - *Has to be unique; recommended to add the sector if there are conflicts e.g. [A0].*
  - `location` - **Object with x & y coordinates** - Required -  *Map coordinates are shown in the bottom left.*
  - `description` - **List of Strings** - *Every list item is a paragraph, supports html tags.*
  - `video` - **String** - *Link to a video on YouTube, only uses the video id, e.g. `https://www.youtube.com/watch?v=xvFZjo5PgG0` = `xvFZjo5PgG0`*
  - `tags` - **List of Strings** - *Accepted values: `"mission"`, `"fortress"`*
- Regenerate the `key-data.js` file by running `npm run generate-ids`. This automatically generates ids for every key location, used as a unique identifier in the application.
