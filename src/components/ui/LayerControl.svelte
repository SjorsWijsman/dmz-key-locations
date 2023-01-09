<script>
  import { map, layers, activeLayers } from "$store";
  import { onMount } from "svelte";

  let isOpen = false;

  onMount(() => {
    // Turn layers in activeLayers on
    // This is done to persist layer selection between sessions
    $layers.forEach((layer) => {
      if ($activeLayers.includes(layer.title)) {
        layer.on = true;
      }
    });

    // Add/remove layers from map on layer.on Boolean update
    layers.subscribe((layerList) => {
      layerList.forEach((layer) => {
        if (layer.on) {
          // Add layer to map & sync with activeLayers store
          $map.addLayer(layer.layer);
          $activeLayers = [...$activeLayers, layer.title];
        } else {
          // Remove layer from map & sync with activeLayers store
          $map.removeLayer(layer.layer);
          $activeLayers = $activeLayers.filter((item) => item !== layer.title);
        }
      });
    });
  });
</script>

<section
  on:mouseenter={() => (isOpen = true)}
  on:mouseleave={() => (isOpen = false)}
  class:isOpen
>
  {#if !isOpen}
    <img src="./icons/leaflet/layers.png" alt="" />
  {:else}
    <form>
      {#each $layers as layer}
        <label class:divider={layer.title === "Show POI Labels"}>
          <input type="checkbox" bind:checked={layer.on} />
          {layer.title}
        </label>
      {/each}
    </form>
  {/if}
</section>

<style>
  section {
    position: fixed;
    z-index: 2000;
    right: 0;
    bottom: 0;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: var(--color-black);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    opacity: 0.9;
    text-shadow: 0 0 2rem rgba(0, 0, 50, 20%);
    padding: 0.5rem;
    width: 3.5rem;
    height: 3.5rem;
  }

  section.isOpen {
    width: unset;
    height: unset;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    align-items: center;
    padding: 2px 0;
    font-weight: 400;
  }

  label.divider {
    border-top: 1px solid var(--color-black-light);
    margin-top: 5px;
    padding-top: 5px;
  }

  input {
    margin-right: 0.5rem;
  }

  img {
    width: 100%;
    padding: 0.1rem;
  }
</style>
