<script>
  import L from 'leaflet'
  import { onMount } from 'svelte';
  import { map, layers } from "../store";
  import { POIs } from '../data';

  function placePOIMarkers() {
    let poiLayer = []

    // Place markers
    const markers = []
    const labelSettings = {direction: 'center', permanent: true, className: "poi-label"}
    POIs.forEach(poi => {
      markers.push(L.tooltip(labelSettings)
        .setLatLng([poi.location.y, poi.location.x])
        .setContent(poi.title)
      )
    });

    // Add markers to layerGroup
    poiLayer = L.layerGroup(markers)

    // Add layer to map
    $map.addLayer(poiLayer)

    // Add to layers store
    $layers = { "Show POI markers": poiLayer, ...$layers}
  }

  onMount(placePOIMarkers)
</script>

<style>
  /* TODO: work around the !important rules */
  :global(.poi-label) {
    opacity: 0.8 !important;
    color: white !important;
    font-size: 0.9rem !important;
    background-color: rgba(19, 19, 22, 0.7) !important;
    text-shadow: 0 0 2rem rgba(0, 0, 50, 20%) !important;
    border: none !important;
    box-shadow: none !important; 
    padding: 0.2rem 0.5rem !important;
    margin: 0 !important;
  }
</style>