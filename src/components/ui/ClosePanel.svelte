<script>
  import { activePanel } from "../../store";

  export let panelTitle;

  function openCloseSearchPanel() {
    if ($activePanel === panelTitle) {
      $activePanel = null;
    } else {
      $activePanel = panelTitle;
    }
  }
</script>

<button on:click={openCloseSearchPanel}>
  <slot />
</button>

<style>
  button {
    position: relative;
    height: 3rem;
    width: 3rem;
    margin-top: 0.75rem;
    background-color: var(--color-black);
    border: none;
    cursor: pointer;
    padding: 0.6rem;
    border-radius: 0 0.5rem 0.5rem 0;
  }

  button:hover,
  button:focus {
    background-color: var(--color-black-light);
  }

  button :global(img) {
    max-width: 100%;
    max-height: 100%;
  }
</style>
