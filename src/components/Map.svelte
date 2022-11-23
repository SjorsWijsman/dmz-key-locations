<script>
  import { onMount } from 'svelte';
  import { map, layers } from '../store';
  import L from 'leaflet'
  import Grid from './Grid.svelte';
  import mapImage from '../assets/map.png'

  let mapContainer
  let layerControl

  function createMap() {
    $map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      minZoom: -3,
      zoomControl: false
    });

    let bounds = [[0,0], [4150,4150]];
    let image = L.imageOverlay(mapImage, bounds).addTo($map)

    L.control.zoom({
      position:'topright'
    }).addTo($map);
    
    layerControl = L.control.layers(null, {}, {position: 'bottomright'}).addTo($map)

    $map.fitBounds(bounds)
  }

  layers.subscribe(layerObj => {
    if (layerObj && layerControl) {
      layerControl.remove($map)
      layerControl = L.control.layers(null, {...layerObj}, {position: 'bottomright'}).addTo($map)
    }
  })

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