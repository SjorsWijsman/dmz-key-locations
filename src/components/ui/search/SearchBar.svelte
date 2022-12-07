<script>
  import { searchTerm, selectedMarker } from "$store";
</script>

<nav>
  <input
    type="text"
    required
    bind:value={$searchTerm}
    on:click={() => ($selectedMarker = { title: "" })}
    placeholder={$selectedMarker?.title || "Search for a key"}
  />
  {#if $searchTerm}
    <button class="close" on:click={() => ($searchTerm = "")}>
      <img src="./icons/xmark.svg" alt="" />
    </button>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    flex-direction: row;
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
    nav {
      width: calc(100% - 4rem);
    }
  }

  button.close {
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

  button.close:hover {
    opacity: 0.8;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>
