<script>
  import Map from "./components/map/Map.svelte";
  import SearchPanel from "./components/ui/SearchPanel.svelte";
  import InfoPanel from "./components/ui/InfoPanel.svelte";
  import "leaflet/dist/leaflet.css";
  import "./map.css";
  import { keys } from "./data/key-data";

  console.log("Keys in total: " + keys.length);

  const keysWithoutLocation = keys.filter((key) => !key.location);
  console.log("Keys missing location: " + keysWithoutLocation.length);

  const keysWithoutDescription = keys.filter((key) => !key.description);
  console.log("Keys missing description: " + keysWithoutDescription.length);

  const keysWithoutLoot = keys.filter((key) => !key.loot);
  console.log("Keys missing loot info: " + keysWithoutLoot.length);
</script>

<main>
  <SearchPanel />
  <InfoPanel />
  <Map />
</main>
