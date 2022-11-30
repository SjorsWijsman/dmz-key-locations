<script>
  import { searchTerm, selectedMarker } from "$store";
</script>

<nav>
  <input
    type="text"
    required
    bind:value={$searchTerm}
    on:click={() => ($selectedMarker = { title: "" })}
    placeholder={$selectedMarker.title || "Search for a key"}
  />
</nav>

<style>
  nav {
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
    background-color: var(--color-black-dark);
    border: none;
    border-radius: 0.3rem;
    max-width: 25rem;
  }

  @media only screen and (max-width: 30rem) {
    input {
      width: calc(100% - 4rem);
    }
  }
</style>
