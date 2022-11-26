<script>
  import L from "leaflet";
  import { map, selectedSector, waypoint } from "../../store";

  // @ts-ignore
  const Coordinates = L.Control.extend({
    onAdd: ($map) => {
      let previousLat,
        previousLng,
        previousWaypoint = 0;
      const container = L.DomUtil.create("div");
      $map.addEventListener("mousemove", (e) => {
        let sector = $selectedSector;
        let { lat, lng } = e.latlng;

        if ($waypoint) {
          sector = $waypoint.sector;
          lat = $waypoint.lat;
          lng = $waypoint.lng;
        }

        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        const y = 4150 - Math.round(clamp(lat, 0, 4150));
        const x = Math.round(clamp(lng, 0, 4150));

        if (
          lat !== previousLat ||
          lng !== previousLng ||
          previousWaypoint !== $waypoint
        ) {
          container.innerHTML = `
          <span class="mouse-position">
            ${$waypoint ? '<img src="./icons/location-crosshairs.svg" />' : ""}
            <span>
              ${sector.join("")}
            </span>
            x: <span>${x}m</span>
            y: <span>${y}m</span>
          </span>
        `;
        }
        previousLat = lat;
        previousLng = lng;
        previousWaypoint = $waypoint;
      });
      return container;
    },
  });
  $map.addControl(new Coordinates({ position: "bottomleft" }));
</script>
