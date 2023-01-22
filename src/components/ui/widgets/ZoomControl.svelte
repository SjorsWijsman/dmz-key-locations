<script>
  import { mobileSize } from "$scripts/media-queries";
  import { map, activePanel } from "$store";
  import { onMount } from "svelte";
  import Icon from "../Icon.svelte";

  let minZoom, zoom, maxZoom;
  let outerWidth;

  function zoomIn() {
    zoom += 1;
    $map.setZoom(zoom);
  }

  function zoomOut() {
    zoom -= 1;
    $map.setZoom(zoom);
  }

  $map.on("zoomend", () => (zoom = $map.getZoom()));

  onMount(() => {
    zoom = $map.getZoom();
    maxZoom = $map.getMaxZoom();
    minZoom = $map.getMinZoom();
  });
</script>

<svelte:window bind:outerWidth />

<section class:hide={$activePanel !== null && mobileSize(outerWidth)}>
  <button on:click={zoomIn} disabled={zoom >= maxZoom}>
    <Icon icon={"plus"} size={1.75} />
  </button>
  <button on:click={zoomOut} disabled={zoom <= minZoom}>
    <Icon icon={"minus"} size={1.75} />
  </button>
</section>

<style>
  section {
    position: fixed;
    z-index: 2000;
    right: 0;
    top: 0;
    margin: 10px;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    opacity: 0.9;
    text-shadow: 0 0 2rem rgba(0, 0, 50, 20%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.3s ease-out;
    touch-action: manipulation;
  }

  section.hide {
    transform: translateX(150%);
  }

  section button {
    background-color: var(--color-black);
    border: none;
    padding: 0.3rem;
    margin: 0;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  section button:first-child {
    border-bottom: 1px solid var(--color-black-light);
  }

  section button:hover {
    background-color: var(--color-main);
  }

  section button:disabled {
    opacity: 0.3;
    background-color: var(--color-black);
    cursor: default;
  }
</style>
