<script>
  import Map from "./components/Map.svelte";
  import "leaflet/dist/leaflet.css";
  import { selectedSector } from './store';
</script>

<main>
  <h1>{$selectedSector?.join("") || ""}</h1>
  <Map></Map>
</main>

<style>
  h1 {
    z-index: 500;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
  }
</style>