<script>
  import { onMount } from "svelte";
  import { customMarkers, layers } from "$store";
  import Markers from "../Markers.svelte";

  let placeMarkers;

  const title = "Show Custom Markers";

  onMount(() => {
    customMarkers.subscribe((markers) => {
      $layers = $layers.map((layer) => {
        if (layer.title === title) layer.on = true;
        return layer;
      });

      markers.forEach((marker) => {
        marker.popupContent = `<p>${marker.title}</p>`;
      });

      placeMarkers(markers);
    });
  });
</script>

<Markers bind:placeMarkers {title} iconUrl={"icons/location-user.svg"} />
