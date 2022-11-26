<script>
  import ClosePanel from "./ClosePanel.svelte";
  import SearchBar from "./SearchBar.svelte";
  import SearchResultsList from "./SearchResultsList.svelte";
  import { activePanel } from "../../store";
  import { fly } from "svelte/transition";
</script>

{#if $activePanel === "search"}
  <div transition:fly={{ x: -200 }}>
    <section>
      <SearchBar />
      <SearchResultsList />
    </section>
    <ClosePanel panelTitle={"search"}>
      <img src="./icons/xmark.svg" alt="Close Search Keys Panel" />
    </ClosePanel>
  </div>
{:else if $activePanel === null}
  <div transition:fly={{ x: -50, delay: 1 }}>
    <ClosePanel panelTitle={"search"} long={true}>
      <img src="./icons/key.svg" alt="Open Search Keys Panel" />
    </ClosePanel>
  </div>
{/if}

<style>
  div {
    position: fixed;
    display: flex;
    z-index: 10000;
    margin: 10px;
    margin-left: 0;
    pointer-events: none;
  }

  section {
    display: flex;
    flex-direction: column;
    background-color: var(--color-black);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    margin-left: 10px;
    opacity: 0.9;
    resize: vertical;
    width: 23rem;
    min-height: 10rem;
    max-height: 80vh;
    height: 30rem;
    overflow-y: scroll;
    padding-bottom: 10rem;
    pointer-events: all;
  }
</style>
