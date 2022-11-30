<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import Grid from "./Grid.svelte";
  import KeyMarkers from "./KeyMarkers.svelte";
  import DeaddropMarkers from "./DeaddropMarkers.svelte";
  import POIMarkers from "./POIMarkers.svelte";
  import LocationMarker from "./LocationMarker.svelte";
  import MousePos from "./MousePos.svelte";
  import WaypointPos from "./WaypointPos.svelte";
  import mapImage from "$assets/map.jpg";
  import mapImageHighRes from "$assets/map-high-res.png";
  import { map, layers } from "$store";
  import { isTouchDevice } from "$scripts/platform-check";

  let mapContainer;
  let layerControl;

  const bounds = [
    [0, 0],
    [4150, 4150],
  ];
  const image = L.imageOverlay(mapImage, bounds);
  const imageHighRes = L.imageOverlay(mapImageHighRes, bounds);

  function createMap() {
    $map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      maxZoom: 5,
      minZoom: -4,
      zoomControl: false,
    });

    L.control
      .zoom({
        position: "topright",
      })
      .addTo($map);

    layerControl = L.control
      .layers(
        {
          "Al-Mazrah": image,
          "Al-Mazrah (High Res - 10MB)": imageHighRes,
        },
        {},
        { position: "bottomright" }
      )
      .addTo($map);

    image.addTo($map);

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
        .layers(
          {
            "Al-Mazrah": image,
            "Al-Mazrah (High Res - 10MB)": imageHighRes,
          },
          { ...layerObj },
          { position: "bottomright" }
        )
        .addTo($map);
    }
  });

  onMount(createMap);
</script>

{#if $map}
  <KeyMarkers />
  <DeaddropMarkers />
  <POIMarkers />
  <LocationMarker />
  {#if !isTouchDevice()}
    <MousePos />
  {/if}
  <WaypointPos />
  <Grid />
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
