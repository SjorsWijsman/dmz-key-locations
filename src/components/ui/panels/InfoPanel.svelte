<script>
  import Panel from "../Panel.svelte";
  import Icon from "../Icon.svelte";
</script>

<Panel panelTitle={"info"} icon={"heart"} openIconOffset={2}>
  <div>
    <h2>DMZ Key Locations</h2>
    <p>
      Thanks for using my map! Please contact me through the Discord server
      (link below) if you find a key location that isn't on the map, found a
      typo, bugs, suggestions, etc. I will also be using this Discord for future
      update notes.
    </p>
    <p style:margin-bottom={"2rem"}>
      If you enjoy using this map please consider donating!
    </p>
    <p style:opacity={0.5}>
      Huge thanks to <a
        href="https://www.youtube.com/@TroubleChuteBasics"
        target="_blank"
        rel="noreferrer"
      >
        TroubleChute
      </a>
      for allowing his videos to be used for the project!
    </p>
    <p style:opacity={0.5}>
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
  </div>
  <svelte:fragment slot="footer">
    <a
      href="https://discord.gg/vqCwgh8buH"
      target="_blank"
      rel="noreferrer"
      class="button"
    >
      <Icon icon={"discord"} size={3} />
    </a>
    <a
      href="https://twitter.com/DmzKeys"
      target="_blank"
      rel="noreferrer"
      class="button"
    >
      <Icon icon={"twitter"} size={3} />
    </a>
    <a
      href="https://github.com/SjorsWijsman/dmz-key-locations"
      target="_blank"
      rel="noreferrer"
      class="button"
    >
      <Icon icon={"github"} size={3} />
    </a>
    <a
      href="https://www.paypal.com/donate/?hosted_button_id=L599J6499CT5W"
      target="_blank"
      rel="noreferrer"
      class="button"
    >
      <Icon icon={"heart"} size={3} />
      <span>Donate</span>
    </a>
  </svelte:fragment>
</Panel>

<style>
  div {
    padding: 1rem;
  }

  div > p {
    opacity: 0.9;
    line-height: 1.3rem;
  }

  a.button {
    display: block;
    display: flex;
    align-items: center;
    height: 3rem;
    width: 3rem;
    margin-right: 1rem;
    background-color: var(--color-black-dark);
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.1s ease-out;
  }

  @media (hover: hover) {
    a.button:hover {
      background-color: var(--color-main);
      transform: scale(1.2);
    }
  }

  a.button:last-of-type {
    width: 9rem;
    padding: 0.3rem 1rem;
    padding-left: 0.4rem;
    background-color: var(--color-contrast);
    font-weight: bold;
    font-size: 1.2rem;
  }

  @media (hover: hover) {
    a.button:last-of-type:hover {
      background-color: var(--color-contrast-light);
    }
  }
</style>
