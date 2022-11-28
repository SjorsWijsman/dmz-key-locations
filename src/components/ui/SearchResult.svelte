<script>
  import {
    keyMarkers,
    selectedMarker,
    openKeyInfo,
    favorites,
  } from "../../store";
  import { fadeSlide } from "../../scripts/fade-slide";
  import SearchResultInfo from "./SearchResultInfo.svelte";

  export let title = "Untitled Location",
    location = {},
    missionRequirement = false,
    fortress = false,
    description = [],
    loot = [];

  let element;

  function goToKeyLocation(event) {
    if (event) event.stopPropagation();
    openMarkerPopup();
  }

  function openMarkerPopup() {
    for (const marker of $keyMarkers) {
      if (marker.options.title === title) {
        // Reopen popup
        marker.closePopup();
        marker.openPopup();
      }
    }
  }

  function toggleDetails() {
    if ($openKeyInfo === title) {
      $openKeyInfo = "";
    } else {
      $openKeyInfo = title;
    }
  }

  function toggleFavorite(event) {
    if (event) event.stopPropagation();
    if ($favorites.includes(title)) {
      $favorites = $favorites.filter((item) => item !== title);
    } else {
      $favorites = [...$favorites, title];
    }
  }

  selectedMarker.subscribe((selection) => {
    if (selection.title === title) {
      $openKeyInfo = title;
    }
  });
</script>

<li
  on:click={toggleDetails}
  on:keypress={toggleDetails}
  class:isOpen={$openKeyInfo === title}
  class:isFavorite={$favorites.includes(title)}
  bind:this={element}
>
  <article>
    <h2>
      {title}
    </h2>
    <SearchResultInfo
      {...{ title, missionRequirement, fortress, description, loot }}
      isOpen={$openKeyInfo === title}
    />
    <img src="./icons/chevron-down.svg" alt="" />
  </article>
  <div class="button-box">
    <button on:click={goToKeyLocation} disabled={!location?.x || !location?.y}>
      {#if location?.x && location?.y}
        {#if $favorites.includes(title)}
          <img
            transition:fadeSlide|local
            src="./icons/location-dot-favorite.svg"
            alt=""
          />
        {:else}
          <img
            transition:fadeSlide|local
            src="./icons/location-dot.svg"
            alt=""
          />
        {/if}
      {:else}
        <img src="./icons/question.svg" alt="" />
      {/if}
    </button>
    {#if $openKeyInfo === title}
      <button
        on:click={toggleFavorite}
        class="favorite-button"
        disabled={!location}
        transition:fadeSlide|local={{ duration: 200 }}
      >
        <img src="./icons/star.svg" alt="" />
      </button>
    {/if}
  </div>
</li>

<style>
  li {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 1rem;
    margin: 0 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    min-height: 4.3rem;
    scroll-margin-top: 4.5rem;
  }

  li:hover,
  li.isOpen {
    background-color: var(--color-black-dark);
  }

  li.isOpen {
    margin: 0;
    padding-bottom: 3rem;
    box-shadow: inset 0 -1rem 1.5rem -1rem rgba(0, 0, 10, 0.6);
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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--color-black-dark);
    border: none;
    margin-left: 1rem;
    border-radius: 0.3rem;
    transition: all 0.1s ease-out;
    cursor: pointer;
    user-select: none;
    align-self: center;
    width: 3rem;
    height: 3rem;
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
    width: 1.6rem;
    height: 1.6rem;
  }

  li:hover button,
  li.isOpen button {
    background-color: var(--color-black);
  }

  li.isFavorite button:hover:not(:disabled, .favorite-button) img {
    filter: brightness(10);
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

  .button-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .favorite-button {
    margin-top: 1.5rem;
  }

  .favorite-button:hover:not(:disabled) {
    background-color: var(--color-favorite-light);
  }

  li.isFavorite .favorite-button {
    background-color: var(--color-favorite);
  }
</style>
