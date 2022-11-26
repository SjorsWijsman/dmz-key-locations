<script>
  import { activePanel } from "../../store";

  export let panelTitle;
  export let long = false;

  function openCloseSearchPanel() {
    if ($activePanel === panelTitle) {
      $activePanel = null;
    } else {
      $activePanel = panelTitle;
    }
  }
</script>

<button on:click={openCloseSearchPanel} class:long>
  <slot />
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    position: relative;
    height: 3rem;
    width: 3rem;
    margin-top: 0.75rem;
    background-color: var(--color-black);
    border: none;
    cursor: pointer;
    padding: 0.6rem;
    border-radius: 0 0.5rem 0.5rem 0;
    transition: all 0.1s ease-out;
    pointer-events: all;
  }

  button.long {
    justify-content: flex-end;
    width: 3.75rem;
  }

  button.long:hover,
  button.long:focus {
    width: 4.5rem;
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
