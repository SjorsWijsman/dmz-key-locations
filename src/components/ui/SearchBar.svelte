<script>
  import { searchTerm } from "../../store";
</script>

<nav>
  <input
    type="text"
    required
    bind:value={$searchTerm}
    placeholder="Search for a key"
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
  }
</style>
