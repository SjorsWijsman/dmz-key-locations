<script>
  import Panel from "./Panel.svelte";
  import { showVideo } from "$store";
</script>

<Panel panelTitle={"user"} openIcon={"./icons/user.svg"} closeIconOffset={4}>
  <div>
    <h2>User Preferences</h2>
    <form action="" on:submit|preventDefault>
      <input
        type="checkbox"
        name="showVideo"
        id="showVideo"
        bind:checked={$showVideo}
      />
      <label for="showVideo">
        Display video above key marker (if available)
      </label>
    </form>
  </div>
  <div>
    <h2 class="soon">Custom Markers</h2>
    <p class="soon">Coming soon!</p>
  </div>
</Panel>

<style>
  div {
    padding: 1rem;
  }

  form {
    display: grid;
    grid-template-columns: 3rem 6fr;
    padding-bottom: 2rem;
    margin-top: 1rem;
  }

  label,
  input {
    cursor: pointer;
    margin: auto 0;
  }

  label {
    opacity: 0.9;
  }

  input {
    height: 1.8rem;
    width: 1.8rem;
  }

  h2 {
    margin: 0.5rem 0;
  }

  .soon {
    opacity: 0.5;
  }
</style>
