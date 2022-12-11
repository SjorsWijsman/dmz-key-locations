<script>
  import { fadeSlide } from "$scripts/fade-slide";
  import { searchTerm, selectedMarker, filter, openKeyInfo } from "$store";
  import SearchFilter from "./SearchFilter.svelte";

  let openFilter = false;

  openKeyInfo.subscribe(() => (openFilter = false));
</script>

<nav>
  <button
    class="filter"
    class:openFilter
    class:active={$filter !== "all"}
    on:click={() => (openFilter = !openFilter)}
  >
    {#if $filter === "all"}
      <img
        src="./icons/filter.svg"
        alt="Filter Keys"
        transition:fadeSlide|local={{ duration: 200 }}
      />
    {:else if $filter === "favorite"}
      <img
        src="./icons/star-favorite.svg"
        alt="Filtered Keys By Favorite"
        transition:fadeSlide|local={{ duration: 200 }}
      />
    {:else if $filter === "mission"}
      <img
        src="./icons/circle-exclamation.svg"
        alt="Filtered Keys By Mission"
        transition:fadeSlide|local={{ duration: 200 }}
      />
    {:else if $filter === "fortress"}
      <img
        src="./icons/fortress.svg"
        alt="Filtered Keys By Fortress"
        transition:fadeSlide|local={{ duration: 200 }}
      />
    {/if}
  </button>
  <input
    type="text"
    required
    bind:value={$searchTerm}
    on:click={() => {
      $selectedMarker = { title: "" };
    }}
    placeholder={$selectedMarker?.title || "Search for a key"}
  />
  {#if $searchTerm}
    <button class="clear" on:click={() => ($searchTerm = "")}>
      <img src="./icons/xmark.svg" alt="Clear Search" />
    </button>
  {/if}
  {#if openFilter}
    <SearchFilter bind:openFilter />
  {/if}
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: var(--color-black);
    width: 100%;
    padding: 1rem;
    box-shadow: 0 0 1rem var(--color-black-dark);
  }

  input {
    width: 100%;
    padding: 0.6rem;
    padding-right: 2.5rem;
    background-color: var(--color-black-dark);
    border: none;
    border-radius: 0 0.3rem 0.3rem 0;
    max-width: 25rem;
    min-height: 2.5rem;
    height: 2.5rem;
  }

  @media only screen and (max-width: 30rem) {
    nav {
      padding-right: 5rem;
    }
  }

  button {
    transition: all 0.1s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0;
  }

  button.filter {
    min-width: 2.5rem;
    width: 2.5rem;
    min-height: 2.5rem;
    height: 2.5rem;
    padding: 0.6rem;
    background-color: var(--color-black-dark);
    border: none;
    border-radius: 0.3rem 0 0 0.3rem;
    margin-right: 0.1rem;
    cursor: pointer;
  }

  button.filter.active img {
    opacity: 1;
  }

  button.filter img {
    opacity: 0.6;
    user-select: none;
  }

  @media (hover: hover) {
    button.filter:hover img {
      opacity: 0.9;
    }
  }

  button.filter.openFilter {
    background-color: var(--color-black-light);
  }

  button.filter.openFilter img {
    opacity: 1;
  }

  button.clear {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(calc(-50% + -0.7rem), -50%);
    background-color: transparent;
    opacity: 0.6;
    padding: 0;
    height: unset;
    width: 1.5rem;
    height: 1.5rem;
    border: 0;
    cursor: pointer;
  }

  @media (hover: hover) {
    button.clear:hover {
      opacity: 0.9;
    }
  }

  img {
    width: 100%;
    height: 100%;
    user-select: none;
  }
</style>
