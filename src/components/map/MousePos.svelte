<script>
  import L from "leaflet";
  import { map, selectedSector } from "../../store";

  // @ts-ignore
  const Coordinates = L.Control.extend({
    onAdd: ($map) => {
      const container = L.DomUtil.create("div");
      $map.addEventListener("mousemove", (e) => {
        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
        const x = Math.round(clamp(e.latlng.lng, 0, 4150));
        const y = 4150 - Math.round(clamp(e.latlng.lat, 0, 4150));
        container.innerHTML = `
          <span class="mouse-position">
            <span>
              ${$selectedSector?.join("")}
            </span>
            x: <span>${x}m</span>
            y: <span>${y}m</span>
          </span>
        `;
      });
      return container;
    },
  });
  $map.addControl(new Coordinates({ position: "bottomleft" }));
</script>

<style>
  :global(.mouse-position) {
    opacity: 1;
    color: white !important;
    font-size: 1rem;
    background-color: rgba(19, 19, 22, 0.7);
    text-shadow: 0 0 2rem rgba(0, 0, 50, 20%);
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
  }

  :global(.mouse-position > span) {
    font-weight: bold;
    color: white !important;
    margin-right: 0.5rem;
  }

  :global(.mouse-position > span:last-of-type) {
    margin-right: 0;
  }
</style>
