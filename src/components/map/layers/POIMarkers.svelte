<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import { map, layers, activeLayers } from "$store";
  import { POIs } from "$data/map-data";

  function placePOIMarkers() {
    let poiLayer = [];

    // Place markers
    const markers = [];
    const labelSettings = {
      direction: "center",
      permanent: true,
      className: "map-label",
      pane: "locations",
    };

    $map.createPane("locations");
    $map.getPane("locations").style.zIndex = 650;
    $map.getPane("locations").style.pointerEvents = "none";

    POIs.forEach((poi) => {
      markers.push(
        L.tooltip(labelSettings)
          .setLatLng([4150 - poi.location.y, poi.location.x])
          .setContent(poi.title)
      );
    });

    // Add markers to layerGroup
    poiLayer = L.layerGroup(markers);

    // Add layer to map
    if ($activeLayers.includes("Show POI Labels")) $map.addLayer(poiLayer);

    // Add to layers store
    $layers = { ...$layers, "Show POI Labels": poiLayer };
  }

  onMount(placePOIMarkers);
</script>
