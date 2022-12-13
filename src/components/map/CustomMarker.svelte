<script>
    import L from "leaflet";
    import { onMount } from "svelte";
    import { map, customMarkers, layers } from "$store";
    import { isTouchDevice } from "$scripts/platform-check";
  
    // @ts-ignore
  
    const iconSettings = {
      iconUrl: "./icons/flag-magenta.svg",
      iconSize: [20, 20], // size of the icon
      iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
    };
  
    function setSelectedMarker(marker){
      // Go to location
      $map.setView(
        [marker.lat + (isTouchDevice() ? 100 : 0), marker.lng],
        0,
        {
          animate: true,
          pan: {
            duration: 0.3,
          },
        }
      );
    };
  
    function placeCustomMarkers() {
      // Place markers
      const markers = [];
      let customMarkersLayer = [];
  
      $customMarkers.forEach((marker) => {
        iconSettings["id"] = marker.id;
        const icon = L.icon(iconSettings);
        let l_marker = L.marker([marker.lat, marker.lng], {icon, })
          .on("click", () => setSelectedMarker(marker))
        markers.push(l_marker);
      });

      customMarkersLayer = L.layerGroup(markers);
  
      // Add layer to map
      $map.addLayer(customMarkersLayer);
  
      // Add to layers store
      $layers = { ...$layers, "Show Custom Markers": customMarkersLayer };
    };

    customMarkers.subscribe(() => placeCustomMarkers());
    
    onMount(placeCustomMarkers);
  </script>
  