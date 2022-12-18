<script>
  import { onMount } from "svelte";
  import { customMarkers } from "$store";
  import Markers from "../Markers.svelte";

  let placeMarkers;

  $customMarkers.forEach((marker) => {
    marker.popupContent = `<p>${marker.title}</p>`;
  });

  onMount(() => {
    customMarkers.subscribe((markers) => {
      placeMarkers(markers);
    });
  });
</script>

<Markers
  bind:placeMarkers
  title={"Show Custom Markers"}
  iconUrl={"icons/location-user.svg"}
/>
