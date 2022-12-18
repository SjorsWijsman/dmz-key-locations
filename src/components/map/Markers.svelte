<script>
  import L from "leaflet";
  import { layers, map } from "$store";

  export let openPopupFunction = (marker) => {
    return marker;
  };
  export let closePopupFunction = (marker) => {
    return marker;
  };
  export let onClickFunction = (marker) => {
    return marker;
  };

  export let title;
  export let iconUrl;

  let layer = L.layerGroup();
  let markers = [];

  const iconSettings = {
    iconUrl,
    shadowUrl: "icons/location-black-background.svg",
    iconSize: [20, 20], // size of the icon
    shadowSize: [20, 20],
    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 20],
    popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
  };

  export function placeMarkers(markerLocations) {
    layer.clearLayers();

    // Add markers to layer
    markerLocations.forEach((markerLocation) => {
      if (markerLocation.location) {
        const icon = L.icon(iconSettings);

        let marker = L.marker(
          [4150 - markerLocation.location?.y, markerLocation.location?.x],
          {
            title: markerLocation.title,
            icon,
          }
        )
          .bindPopup(markerLocation.popupContent)
          .on("click", () => onClickFunction(marker))
          .on("popupopen", () => openPopup(marker))
          .on("popupclose", () => closePopup(marker));

        markers = [...markers, marker];

        marker.addTo(layer);
      }
    });

    // Add to layers store if it has not been added yet
    if (!$layers.map((item) => item.title).includes(title)) {
      $layers = [...$layers, { title, layer }];
    }
  }

  function openPopup(marker) {
    L.DomUtil.addClass(marker._icon, "active-marker");
    // Go to location
    $map.setView([marker.getLatLng()?.lat, marker.getLatLng()?.lng], 0, {
      animate: true,
      pan: {
        duration: 0.3,
      },
    });
    openPopupFunction(marker);
  }

  function closePopup(marker) {
    if (marker._icon) L.DomUtil.removeClass(marker._icon, "active-marker");
    closePopupFunction(marker);
  }
</script>
