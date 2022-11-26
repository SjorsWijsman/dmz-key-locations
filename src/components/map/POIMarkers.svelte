<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import { layers, map } from "../../store";
  import { POIs } from "../../data/map-data";

  function placePOIMarkers() {
    let poiLayer = [];

    // Place markers
    const markers = [];
    const labelSettings = {
      direction: "center",
      permanent: true,
      className: "map-label",
    };

    POIs.forEach((poi) => {
      markers.push(
        L.tooltip(labelSettings)
          .setLatLng([4150 - poi.location.y, poi.location.x])
          .setContent(poi.title)
      );
    });

    // Add markers to layerGroup
    poiLayer = L.layerGroup(markers);

    // Add layer to map (commented out to default to off)
    // $map.addLayer(poiLayer)

    // Add to layers store
    $layers = { ...$layers, "Show POI Labels": poiLayer };
  }

  onMount(placePOIMarkers);
</script>
