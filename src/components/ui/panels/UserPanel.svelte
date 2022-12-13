<script>
  import Panel from "./Panel.svelte";
  import { map, showVideo, customMarkers } from "$store";
  import { isTouchDevice } from "$scripts/platform-check";

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

  function removeMarker(marker){
    $customMarkers = $customMarkers.filter((item) => item.id !== marker.id);
    $map.eachLayer((layer) => {
      if (layer.hasOwnProperty('options')){
        let options = layer.options;
        if (options.hasOwnProperty('icon')){
          if(layer.options.icon.options.id===marker.id){
            $map.removeLayer(layer);
          }
        }
      }
    });
  };
</script>

<Panel panelTitle={"user"} openIcon={"./icons/user.svg"} closeIconOffset={4}>
  <div>
    <h2>User Preferences</h2>
    <form action="" on:submit|preventDefault>
      <input
        type="checkbox"
        name="showVideo"
        id="showVideo"
        bind:checked={$showVideo}
      />
      <label for="showVideo">
        Display video above key marker (if available)
      </label>
    </form>
  </div>
  <div>
    <h2>Custom Markers</h2>

    {#each $customMarkers as marker}
    <button
      on:click={() => setSelectedMarker(marker)}>
      x:{marker.lat}m y:{marker.lng}m
    </button>
    <input
      type="image"
      src="./icons/trash.svg"
      alt="Remove"
      on:click={() => removeMarker(marker)}>
    <br/>
    {/each}
  </div>
</Panel>

<style>
  div {
    padding: 1rem;
  }

  form {
    display: grid;
    grid-template-columns: 3rem 6fr;
    padding-bottom: 2rem;
    margin-top: 1rem;
  }

  label,
  input {
    cursor: pointer;
    margin: auto 0;
  }

  label {
    opacity: 0.9;
  }

  input {
    height: 1.8rem;
    width: 1.8rem;
  }

  input[type="image" i] {
    height: 1rem;
  }

  h2 {
    margin: 0.5rem 0;
  }

  button {
    background-color: inherit;
    border-style: hidden;
    padding: 5px;
  }
</style>
