<script>
  import { map, keyMarkers } from "../../store";

  export let key;

  function goToKeyLocation() {
    openMarkerPopup();
  }

  function openMarkerPopup() {
    for (const marker of $keyMarkers) {
      if (marker.options.title === key.title) {
        marker.openPopup();
      }
    }
  }

  function highlightMarker() {
    // for (const marker of $keyMarkers) {
    //   if (marker.options.title === key.title) {
    //     marker.openPopup();
    //   }
    // }
  }
</script>

<li on:mouseenter={highlightMarker}>
  {key.title}
  <button on:click={goToKeyLocation} disabled={!key.location}>
    {#if key.location}
      <img src="./location-dot.svg" alt="" />
    {:else}
      <img src="./question.svg" alt="" />
    {/if}
  </button>
</li>

<style>
  li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3rem 1rem;
    margin: 0 0;
    transition: all 0.1s ease-out;
  }

  li:hover {
    font-weight: bold;
    background-color: var(--color-black-dark);
    padding: 1rem 1rem;
    margin: 0;
  }

  li:hover button:not(:disabled) {
    background-color: var(--color-main);
    transform: scale(1.2);
  }

  button {
    background-color: var(--color-black-dark);
    border: none;
    margin-left: 1rem;
    border-radius: 0.3rem;
    transition: all 0.1s ease-out;
    cursor: pointer;
    user-select: none;
  }

  button:disabled {
    opacity: 0.2;
    cursor: default;
  }

  button img {
    width: 1.2rem;
    margin: 0.3rem;
  }
</style>
