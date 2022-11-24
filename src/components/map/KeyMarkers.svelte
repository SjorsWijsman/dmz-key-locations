<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import { layers, map } from "../../store";
  import { keys } from "../../key-data";

  function placePOIMarkers() {
    let keyLayer = [];

    // Place markers
    const markers = [];

    const icon = L.icon({
      iconUrl: "location-dot.svg",

      iconSize: [20, 20], // size of the icon
      iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -10], // point from which the popup should open relative to the iconAnchor
    });

    keys.forEach((key) => {
      if (key.location) {
        markers.push(
          L.marker([4150 - key.location.y, key.location.x], { icon })
            .bindPopup(key.title)
            .on("click", () => goToKeyLocation(key))
        );
      }
    });

    // Add markers to layerGroup
    keyLayer = L.layerGroup(markers);

    // Add layer to map (commented out to default to off)
    $map.addLayer(keyLayer);

    // Add to layers store
    $layers = { ...$layers, "Show Key Locations": keyLayer };
  }

  function goToKeyLocation(key) {
    $map.setView([4150 - key.location.y, key.location.x], 0, {
      animate: true,
      pan: {
        duration: 0.3,
      },
    });
  }

  onMount(placePOIMarkers);
</script>
