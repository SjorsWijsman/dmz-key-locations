<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import { layers, map, keyMarkers } from "../../store";
  import { keys } from "../../data/key-data";

  let keyLayer = [];

  const icon = L.icon({
    iconUrl: "icons/location-dot.svg",

    iconSize: [20, 20], // size of the icon
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  });

  function placePOIMarkers() {
    keys.forEach((key) => {
      if (key.location) {
        let marker = L.marker([4150 - key.location.y, key.location.x], {
          title: key.title,
          icon,
        })
          .bindPopup(key.title)
          .on("popupopen", () => openPopup(key, marker))
          .on("popupclose", () => closePopup(key, marker));
        $keyMarkers.push(marker);
      }
    });

    // Add markers to layerGroup
    keyLayer = L.layerGroup($keyMarkers);

    // Add layer to map
    $map.addLayer(keyLayer);

    // Add to layers store
    $layers = { ...$layers, "Show Key Locations": keyLayer };
  }

  function openPopup(key, marker) {
    L.DomUtil.addClass(marker._icon, "active-marker");
    // Go to location
    $map.setView([4150 - key.location.y, key.location.x], 0, {
      animate: true,
      pan: {
        duration: 0.3,
      },
    });
  }

  function closePopup(key, marker) {
    L.DomUtil.removeClass(marker?._icon, "active-marker");
  }

  onMount(placePOIMarkers);
</script>
