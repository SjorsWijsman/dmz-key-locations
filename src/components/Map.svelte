<script>
  import { onMount } from 'svelte';
  import { map } from '../store';
  import L from 'leaflet'
  import Grid from './Grid.svelte';
  import mapImage from '../assets/map.png'

  let mapContainer

  function createMap() {
    $map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      minZoom: -3
    });

    let bounds = [[0,0], [4150,4150]];
    let image = L.imageOverlay(mapImage, bounds).addTo($map);

    $map.fitBounds(bounds)
  }

  onMount(createMap)
</script>

{#if $map}
  <Grid />
{/if}
<section bind:this={mapContainer}></section>

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