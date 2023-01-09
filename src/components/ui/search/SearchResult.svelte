<script>
  import {
    keyMarkers,
    selectedMarker,
    openKeyInfo,
    favorites,
    layers,
  } from "$store";
  import { fadeSlide } from "$scripts/fade-slide";
  import SearchResultContent from "./SearchResultContent.svelte";
  import Icon from "../Icon.svelte";

  export let id = "untitled-location",
    title = "Untitled Location",
    location = {},
    description = [],
    loot = [],
    video = "",
    tags = [];

  let copied = false;

  // Prevent unused variable warning - Remove when video gets used in searchresult.
  $: video;

  function openMarkerPopup() {
    $layers = $layers.map((item) => {
      if (item.title === "Show Key Locations") item.on = true;
      return item;
    });
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

  function toggleFavorite() {
    if ($favorites.includes(title)) {
      $favorites = $favorites.filter((item) => item !== title);
    } else {
      $favorites = [...$favorites, title];
    }
  }

  function copyToClipboard() {
    copied = true;
    const url = window.location.href.split("#")[0];
    navigator.clipboard.writeText(url.concat("#").concat(id));
    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  selectedMarker.subscribe((selection) => {
    if (selection?.title === title) {
      $openKeyInfo = title;
    }
  });
</script>

<li
  on:click={toggleDetails}
  on:keypress={toggleDetails}
  class:isOpen={$openKeyInfo === title}
  class:isFavorite={$favorites.includes(title)}
>
  <article>
    <h2>
      {title}
    </h2>
    <SearchResultContent {...{ title, description, loot, tags }} />
    <Icon icon="chevron-down" size={1.5} />
  </article>
  <div class="button-box">
    <button
      on:click|stopPropagation={openMarkerPopup}
      disabled={!location?.x || !location?.y}
    >
      {#if location?.x && location?.y}
        <Icon
          src={$favorites.includes(title)
            ? "icons/markers/location-favorite.svg"
            : "icons/markers/location-dot.svg"}
          size={2.5}
        />
      {:else}
        <Icon icon="question-mark" size={2.5} />
      {/if}
    </button>
    {#if $openKeyInfo === title}
      <button
        on:click|stopPropagation={toggleFavorite}
        class="favorite-button"
        disabled={!location}
        transition:fadeSlide|local={{ duration: 200 }}
      >
        <Icon icon="star" size={2.25} />
      </button>
      <button
        on:click|stopPropagation={copyToClipboard}
        class="link-button"
        transition:fadeSlide|local={{ duration: 200 }}
      >
        <Icon icon={copied ? "check" : "link"} size={2.25} />
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
    align-items: center;
    padding: 0.4rem 1rem;
    margin: 0;
    transition: all 0.1s ease-out;
    cursor: pointer;
    min-height: 4.2rem;
    scroll-margin-top: 4.5rem;
  }

  li.isOpen {
    background-color: var(--color-black-dark);
  }

  @media (hover: hover) {
    li:hover {
      background-color: var(--color-black-dark);
    }
  }

  li.isOpen {
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
    margin-right: 2.5ch;
    transition: all 0.05s ease-out;
  }

  li.isOpen h2 {
    font-weight: 550;
    font-size: 1.1rem;
    margin-right: 0;
  }

  @media (hover: hover) {
    li:hover h2 {
      font-weight: 550;
      font-size: 1.1rem;
      margin-right: 0;
    }
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

  @media (hover: hover) {
    button:hover:not(:disabled) {
      background-color: var(--color-main);
      transform: scale(1.2);
    }
  }

  button:disabled {
    opacity: 0.2;
    cursor: default;
  }

  li.isOpen button {
    background-color: var(--color-black);
  }

  @media (hover: hover) {
    li:hover button {
      background-color: var(--color-black);
    }
  }
  @media (hover: hover) {
    li.isFavorite button:hover:not(:disabled, .favorite-button) :global(.icon) {
      filter: brightness(100);
    }
  }

  li > article > :global(.icon) {
    position: absolute;
    left: 50%;
    bottom: 0.5rem;
    transform: translateX(-50%);
    opacity: 0;
    transition: all 0.2s ease-out;
  }

  @media (hover: hover) {
    li:hover > article > :global(.icon) {
      opacity: 0.8;
      bottom: 0rem;
    }
  }

  li.isOpen > article > :global(.icon) {
    transform: rotate(-180deg);
  }

  .favorite-button,
  .link-button {
    margin-top: 1.5rem;
  }

  @media (hover: hover) {
    .favorite-button:hover:not(:disabled) {
      background-color: var(--color-favorite-light);
    }
  }

  li.isFavorite .favorite-button {
    background-color: var(--color-favorite);
  }
</style>
