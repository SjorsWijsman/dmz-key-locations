<script>
  export let searchTerm;
</script>

<input
  type="text"
  required
  bind:value={searchTerm}
  placeholder="Search for a key"
/>

<style>
  input {
    width: calc(100% - 2rem);
    padding: 0.6rem;
    background-color: var(--color-black-dark);
    border: none;
    border-radius: 0.3rem;
    margin: 0 1rem;
  }
</style>
