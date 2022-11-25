<script>
  import ClosePanel from "./ClosePanel.svelte";
  import { activePanel } from "../../store";
  import { fly } from "svelte/transition";
</script>

{#if $activePanel === "info"}
  <div transition:fly={{ x: -200 }}>
    <section>
      <header>
        <h2>DMZ Key Locations</h2>
        <p>
          Thanks for using my map! Please contact me through the Discord server
          (link below) if you find a key location that isn't on the map, found a
          typo, bugs, suggestions, etc. I will also be using this Discord for
          future update notes.
        </p>
        <p>If you enjoy using this map please consider donating!</p>
        <p style:opacity={0.5} style:margin-top={"30px"}>
          Inspired by <a
            href="https://dmzintel.com/"
            target="_blank"
            rel="noreferrer"
          >
            dmzintel
          </a>
          and
          <a href="https://www.dmzmap.com/" target="_blank" rel="noreferrer">
            dmzmap
          </a>
        </p>
        <p style:opacity={0.5}>
          Map by <a
            href="https://www.activision.com/"
            target="_blank"
            rel="noreferrer"
          >
            Activision Publishing, Inc.
          </a>
        </p>
        <p style:opacity={0.5} />
      </header>
      <footer>
        <a
          href="https://discord.gg/vqCwgh8buH"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./discord.svg" alt="Discord" />
        </a>
        <a
          href="https://github.com/SjorsWijsman/dmz-key-locations"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./github.svg" alt="Github" />
        </a>
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=L599J6499CT5W"
          target="_blank"
          rel="noreferrer"
        >
          <img src="./heart.svg" alt="Github" />
          Donate
        </a>
      </footer>
    </section>

    <ClosePanel panelTitle={"info"}>
      <img src="./xmark.svg" alt="Close Info Panel" />
    </ClosePanel>
  </div>
{:else if $activePanel === null}
  <div transition:fly={{ x: -50, delay: 1 }} style:top={`${50}px`}>
    <ClosePanel panelTitle={"info"} long={true}>
      <img src="./heart.svg" alt="Open Info Panel" />
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
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color-black);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    margin-left: 10px;
    opacity: 0.9;
    width: 23rem;
  }

  header {
    padding: 1rem;
  }

  footer {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    box-shadow: 0 0 1rem var(--color-black-dark);
  }

  h2 {
    margin: 0.5rem 0;
  }

  p {
    opacity: 0.9;
    line-height: 1.3rem;
  }

  footer > a {
    display: block;
    display: flex;
    align-items: center;
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
    background-color: var(--color-black-dark);
    border-radius: 0.5rem;
    padding: 0.3rem;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.1s ease-out;
  }

  footer > a:hover {
    background-color: var(--color-main);
    transform: scale(1.2);
  }

  footer > a img {
    max-height: 2.5rem;
    max-width: 2.5rem;
  }

  footer > a:last-of-type {
    display: flex;
    margin-right: 0;
    margin-left: auto;
    width: 9rem;
    padding: 0.3rem 1rem;
    background-color: var(--color-succes);
    font-weight: bold;
    font-size: 1.2rem;
  }

  footer > a:last-of-type:hover {
    background-color: var(--color-succes-light);
  }

  footer > a:last-of-type img {
    max-height: 2rem;
    max-width: 2rem;
    margin-right: 0.7rem;
  }
</style>
