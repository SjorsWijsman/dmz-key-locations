<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import { layers, map, activeLayers } from "$store";
  import { deaddrops } from "$data/map-data";

  let deaddropLayer = [];
  let deaddropMarkers = [];

  const iconSettings = {
    iconUrl: "icons/location-deaddrop.svg",
    iconSize: [20, 20], // size of the icon
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  };

  function placeDeaddropMarkers() {
    deaddrops.forEach((deaddrop) => {
      if (deaddrop.location) {
        const icon = L.icon(iconSettings);

        let marker = L.marker(
          [4150 - deaddrop.location.y, deaddrop.location.x],
          {
            title: deaddrop.title,
            icon,
          }
        )
          .bindPopup(`<p>Dead Drop - ${deaddrop.title}</p>`)
          .on("popupopen", () => openPopup(marker))
          .on("popupclose", () => closePopup(marker));

        deaddropMarkers = [...deaddropMarkers, marker];
      }
    });

    // Add markers to layerGroup
    deaddropLayer = L.layerGroup(deaddropMarkers);

    // Add layer to map
    if ($activeLayers.includes("Show Dead Drop Locations"))
      $map.addLayer(deaddropLayer);

    // Add to layers store
    $layers = { ...$layers, "Show Dead Drop Locations": deaddropLayer };
  }

  function openPopup(marker) {
    L.DomUtil.addClass(marker._icon, "active-marker");
  }

  function closePopup(marker) {
    if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
  }

  onMount(placeDeaddropMarkers);
</script>
