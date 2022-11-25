<script>
  import Map from "./components/map/Map.svelte";
  import SearchPanel from "./components/ui/SearchPanel.svelte";
  import InfoPanel from "./components/ui/InfoPanel.svelte";
  import "leaflet/dist/leaflet.css";
  import "./map.css";
</script>

<main>
  <SearchPanel />
  <InfoPanel />
  <Map />
</main>
