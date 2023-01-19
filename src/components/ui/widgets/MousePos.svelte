<script>
  import L from "leaflet";
  import { map, selectedSector } from "$store";

  // @ts-ignore
  const MouseCoordinates = L.Control.extend({
    onAdd: ($map) => {
      let previousLat, previousLng;

      const container = L.DomUtil.create("div");

      $map.addEventListener("mousemove", (e) => {
        let sector = $selectedSector;
        let { lat, lng } = e.latlng;

        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        const y = 4150 - Math.round(clamp(lat, 0, 4150));
        const x = Math.round(clamp(lng, 0, 4150));

        if (lat !== previousLat || lng !== previousLng) {
          container.innerHTML = `
          <span class="mouse-position">
            <span>
              ${sector?.join("")}
            </span>
            x: <span>${x}m</span>
            y: <span>${y}m</span>
          </span>
        `;
        }
        previousLat = lat;
        previousLng = lng;
      });
      return container;
    },
  });

  $map.addControl(new MouseCoordinates({ position: "bottomleft" }));
</script>
