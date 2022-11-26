<script>
  import { keyMarkers } from "../../store";
  import SearchResultInfo from "./SearchResultInfo.svelte";

  export let title,
    location,
    missionRequirement = false,
    description = "",
    loot = "";

  let isOpen = false;

  function goToKeyLocation(event) {
    if (event) event.stopPropagation();
    openMarkerPopup();
  }

  function openMarkerPopup() {
    for (const marker of $keyMarkers) {
      if (marker.options.title === title) {
        marker.closePopup();
        marker.openPopup();
      }
    }
  }

  function toggleDetails() {
    isOpen = !isOpen;
    // if (isOpen) goToKeyLocation();
  }
</script>

<li on:click={toggleDetails} on:keypress={toggleDetails} class:isOpen>
  <article>
    <h2>
      {title}
    </h2>
    <SearchResultInfo {...{ missionRequirement, description, loot }} {isOpen} />
    <img src="./icons/chevron-down.svg" alt="" />
  </article>
  <button on:click={goToKeyLocation} disabled={!location}>
    {#if location}
      <img src="./icons/location-dot.svg" alt="" />
    {:else}
      <img src="./icons/question.svg" alt="" />
    {/if}
  </button>
</li>

<style>
  li {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 1rem;
    padding-bottom: 0.6rem;
    margin: 0 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    min-height: 4.3rem;
  }

  li:hover {
    background-color: var(--color-black-dark);
  }

  li.isOpen {
    margin: 0;
  }

  li.isOpen {
    padding-bottom: 3rem;
    box-shadow: inset 0 -1rem 1rem -1rem var(--color-black-dark);
  }

  article {
    height: 100%;
    padding-bottom: 1rem;
  }

  h2 {
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    margin-top: 1rem;
    transition: all 0.05s ease-out;
  }

  li:hover h2,
  li.isOpen h2 {
    font-weight: 550;
    font-size: 1.1rem;
  }

  button {
    background-color: var(--color-black-dark);
    border: none;
    margin-left: 1rem;
    border-radius: 0.3rem;
    transition: all 0.1s ease-out;
    cursor: pointer;
    user-select: none;
    align-self: center;
  }

  button:hover:not(:disabled) {
    background-color: var(--color-main);
    transform: scale(1.2);
  }

  button:disabled {
    opacity: 0.2;
    cursor: default;
  }

  button img {
    width: 1.2rem;
    margin: 0.3rem;
  }

  li:hover button {
    background-color: var(--color-black);
  }

  li > article > img {
    position: absolute;
    bottom: 0rem;
    left: 50%;
    width: 1.2rem;
    height: 1.2rem;
    opacity: 0;
    transition: all 0.2s ease-out;
  }

  li:hover > article > img {
    opacity: 0.8;
    bottom: 0.3rem;
  }

  li.isOpen > article > img {
    transform: rotate(-180deg);
  }
</style>
