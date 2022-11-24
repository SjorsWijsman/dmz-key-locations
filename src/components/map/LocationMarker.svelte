<script>
  import L from "leaflet";
  import { map } from "../../store";

  let locationMarker;

  $map.on("click", setLocationMarker);

  function setLocationMarker(e) {
    const icon = L.icon({
      iconUrl: "location-crosshairs.svg",

      iconSize: [16, 16], // size of the icon
      iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
    });

    if (locationMarker) locationMarker.remove($map);

    if (
      e.latlng.lat >= 0 &&
      e.latlng.lng >= 0 &&
      e.latlng.lat <= 4150 &&
      e.latlng.lng <= 4150
    ) {
      const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
      const lat = Math.round(clamp(e.latlng.lat, 0, 4150));
      const lng = Math.round(clamp(e.latlng.lng, 0, 4150));

      locationMarker = L.marker({ lat, lng }, { icon });
      locationMarker.addTo($map).on("click", () => locationMarker.remove($map));
    }
  }
</script>
