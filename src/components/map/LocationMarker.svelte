<script>
  import L from "leaflet";
  import { map, selectedSector, waypoint } from "../../store";

  let locationMarker;

  $map.on("click", setLocationMarker);

  function setLocationMarker(e) {
    const icon = L.icon({
      iconUrl: "location-crosshairs.svg",

      iconSize: [16, 16], // size of the icon
      iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
    });

    if (locationMarker) {
      locationMarker.remove($map);
      $waypoint = null;
    }

    let { lat, lng } = e.latlng;

    if (lat >= 0 && lng >= 0 && lat <= 4150 && lng <= 4150) {
      const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
      lat = Math.round(clamp(lat, 0, 4150));
      lng = Math.round(clamp(lng, 0, 4150));

      locationMarker = L.marker({ lat, lng }, { icon });
      locationMarker.addTo($map).on("click", () => {
        locationMarker.remove($map);
        $waypoint = null;
      });

      $waypoint = {
        lat,
        lng,
        sector: $selectedSector,
      };
    }
  }
</script>
