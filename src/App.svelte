<script>
  import Map from "./components/map/Map.svelte";
  import SearchPanel from "./components/ui/SearchPanel.svelte";
  import "leaflet/dist/leaflet.css";
  import "./map.css";
  import { keys } from "./key-data";

  console.log("Total keys: " + keys.length);
  console.log("Keys without location:");
  console.log(
    keys.reduce((acc, key) => {
      if (!key.location) return [key.title, ...acc];
      return acc;
    }, [])
  );
</script>

<main>
  <SearchPanel />
  <Map />
</main>
