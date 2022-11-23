<script>
  import Map from "./components/Map.svelte";
  import "leaflet/dist/leaflet.css";
</script>

<main>
  <Map></Map>
</main>

<style>
  :global(.leaflet-control-layers-overlays label)  {
    margin-top: 0;
  }

</style>