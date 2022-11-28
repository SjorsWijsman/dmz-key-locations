<script>
  import L from "leaflet";
  import { map, waypoint } from "../../store";

  // @ts-ignore
  const Coordinates = L.Control.extend({
    onAdd: ($map) => {
      const container = L.DomUtil.create("div");

      waypoint.subscribe((value) => {
        if (value) {
          let sector = $waypoint?.sector;
          let lat = $waypoint?.lat;
          let lng = $waypoint?.lng;

          const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
          const y = 4150 - Math.round(clamp(lat, 0, 4150));
          const x = Math.round(clamp(lng, 0, 4150));
          container.innerHTML = `
            <span class="mouse-position">
              <img src="./icons/location-crosshairs.svg" />
              <span>
                ${sector?.join("")}
              </span>
              x: <span>${x}m</span>
              y: <span>${y}m</span>
            </span>
          `;
        } else {
          container.innerHTML = "";
        }
      });

      return container;
    },
  });

  $map.addControl(new Coordinates({ position: "bottomleft" }));
</script>
