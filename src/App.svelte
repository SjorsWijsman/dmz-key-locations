<script>
  import "leaflet/dist/leaflet.css";
  import "./map.css";
  import Map from "$components/map/Map.svelte";
  import SearchPanel from "$components/ui/panels/SearchPanel.svelte";
  import UserPanel from "$components/ui/panels/UserPanel.svelte";
  import InfoPanel from "$components/ui/panels/InfoPanel.svelte";
  import { keys } from "$data/key-data";
  import { showVideo } from "$store";

  console.log("Keys in total: " + keys.length);

  const keysWithoutLocation = keys.filter((key) => !key.location);
  console.log("Keys missing location: " + keysWithoutLocation.length);

  const keysWithoutDescription = keys.filter((key) => !key.description);
  console.log("Keys missing description: " + keysWithoutDescription.length);

  const keysWithoutLoot = keys.filter((key) => !key.loot);
  console.log("Keys missing loot info: " + keysWithoutLoot.length);
</script>

<main class:video-disabled={!$showVideo}>
  <SearchPanel />
  <UserPanel />
  <InfoPanel />
  <Map />
</main>
