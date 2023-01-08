<script>
  import { searchTerm, selectedMarker, filter, openKeyInfo } from "$store";
  import Icon from "../Icon.svelte";
  import SearchFilter from "./SearchFilter.svelte";

  let openFilter = false;

  let filterIcon = "filter";
  let filterColor = "#fff";

  openKeyInfo.subscribe(() => (openFilter = false));

  filter.subscribe((value) => {
    filterIcon = "filter";
    filterColor = "#fff";
    switch (value) {
      case "favorite":
        filterIcon = "star";
        filterColor = "var(--color-favorite-light)";
        break;
      case "mission":
        filterIcon = "exclamation-circle";
        filterColor = "var(--color-mission)";
        break;
      case "fortress":
        filterIcon = "fortress";
        break;
    }
  });
</script>

<nav>
  <button
    class="filter"
    class:openFilter
    class:active={$filter !== "all"}
    on:click={() => (openFilter = !openFilter)}
  >
    <Icon icon={filterIcon} color={filterColor} />
  </button>
  <div class="search-box">
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
        <Icon icon="x-mark" />
      </button>
    {/if}
  </div>
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
    background-color: var(--color-black-dark);
    border: none;
    border-radius: 0.3rem 0 0 0.3rem;
    margin-right: 0.1rem;
    cursor: pointer;
  }

  button.filter.active {
    opacity: 1;
  }

  button.filter {
    opacity: 0.6;
    user-select: none;
  }

  @media (hover: hover) {
    button.filter:hover {
      opacity: 0.9;
    }
  }

  button.filter.openFilter {
    background-color: var(--color-black-light);
  }

  button.filter.openFilter {
    opacity: 1;
  }

  .search-box {
    position: relative;
    width: 100%;
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

  button.clear {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    background-color: transparent;
    opacity: 0.6;
    height: unset;
    width: 2.5rem;
    height: 2.5rem;
    border: 0;
    cursor: pointer;
  }

  @media (hover: hover) {
    button.clear:hover {
      opacity: 0.9;
    }
  }
</style>
