<script>
  import L from "leaflet";
  import { onMount } from "svelte";
  import { map, customMarkers, layers, activeLayers } from "$store";

  let customMarkerLayer = L.layerGroup();

  const iconSettings = {
    iconUrl: "./icons/location-user.svg",
    shadowUrl: "icons/location-black-background.svg",
    iconSize: [20, 20], // size of the icon
    shadowSize: [20, 20],
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 20],
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  };

  function placeCustomMarkers() {
    // Place markers
    const markers = [];

    $customMarkers.forEach((customMarker) => {
      const icon = L.icon(iconSettings);
      let marker = L.marker([customMarker.lat, customMarker.lng], { icon })
        .bindPopup(`<p>${customMarker.title}</p>`)
        .on("popupopen", () => openPopup(customMarker, marker))
        .on("popupclose", () => closePopup(customMarker, marker));
      markers.push(marker);
    });

    // Add markers to layerGroup
    customMarkerLayer = L.layerGroup(markers);

    // Add to layers store
    $layers = { ...$layers, "Show Custom Markers": customMarkerLayer };

    // Add layer to map
    if ($activeLayers.includes("Show Custom Markers"))
      $map.addLayer(customMarkerLayer);
  }

  function openPopup(customMarker, marker) {
    L.DomUtil.addClass(marker._icon, "active-marker");
    // Go to location
    $map.setView([customMarker.lat, customMarker.lng], 0, {
      animate: true,
      pan: {
        duration: 0.3,
      },
    });
  }

  function closePopup(customMarker, marker) {
    if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
  }

  customMarkers.subscribe(() => {
    // Empty custom markers first -> Allows for reloading custom markers
    $map.removeLayer(customMarkerLayer);
    placeCustomMarkers();
  });

  onMount(placeCustomMarkers);
</script>
