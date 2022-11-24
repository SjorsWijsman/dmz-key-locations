<script>
  import Map from "./components/map/Map.svelte";
  import SearchPanel from "./components/ui/SearchPanel.svelte";
  import "leaflet/dist/leaflet.css";
  import "./map.css";
</script>

<main>
  <SearchPanel />
  <Map />
</main>
