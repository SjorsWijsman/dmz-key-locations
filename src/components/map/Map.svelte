<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import Grid from "./Grid.svelte";
  import KeyMarkers from "./KeyMarkers.svelte";
  import POIMarkers from "./POIMarkers.svelte";
  import LocationMarker from "./LocationMarker.svelte";
  import MousePos from "./MousePos.svelte";
  import mapImage from "../../assets/map.jpg";
  import { map, layers } from "../../store";

  let mapContainer;
  let layerControl;

  function createMap() {
    $map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      maxZoom: 5,
      minZoom: -4,
      zoomControl: false,
    });

    let bounds = [
      [0, 0],
      [4150, 4150],
    ];
    let image = L.imageOverlay(mapImage, bounds).addTo($map);

    L.control
      .zoom({
        position: "topright",
      })
      .addTo($map);

    layerControl = L.control
      .layers(null, {}, { position: "bottomright" })
      .addTo($map);

    $map.fitBounds(bounds);
    $map.setMaxBounds([
      [-3000, -3000],
      [7150, 7150],
    ]);
  }

  layers.subscribe((layerObj) => {
    if (layerObj && layerControl) {
      layerControl.remove($map);
      layerControl = L.control
        .layers(null, { ...layerObj }, { position: "bottomright" })
        .addTo($map);
    }
  });

  onMount(createMap);
</script>

{#if $map}
  <KeyMarkers />
  <POIMarkers />
  <Grid />
  <LocationMarker />
  <MousePos />
{/if}
<section bind:this={mapContainer} />

<style>
  section {
    height: 100vh;
    background-color: transparent;
  }

  section :global(*) {
    color: var(--color-black-dark);
  }

  section :global(.leaflet-control-attribution) {
    display: none;
  }
</style>
