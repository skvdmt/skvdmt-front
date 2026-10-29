<script setup>
const config = useRuntimeConfig();
const [favo, soft, libs] = await Promise.all([
  useFetch(() => `${config.public.apiBase}/text/favo`, { timeout: config.public.timeout }),
  useFetch(() => `${config.public.apiBase}/text/soft`, { timeout: config.public.timeout }),
  useFetch(() => `${config.public.apiBase}/text/libs`, { timeout: config.public.timeout }),
]);
if (favo.error.value || soft.error.value || libs.error.value) {
  throw new Error("Error loading data from the server.");
}
</script>

<template>
  <div class="favorites-wrapper">
    <div class="container">
      <h2 id="favorites_header"">{{ favo.data.value?.text }}</h2>
      <div class="favorites">
        <h3 id="favorites_first_subheader">{{ soft.data.value?.text }}</h3>
        <FavoritesSoftware />
        <h3 id="favorites_second_subheader">{{ libs.data.value?.text }}</h3>
        <FavoritesLibs />
      </div>
    </div>
  </div>
</template>

<style scoped>
.favorites-wrapper {
  padding: 30px 0;
  h2 {
    text-align: center;
    min-height: 48px;
  }
  .favorites {
    h3 {
      text-align: center;
      min-height: 36px;
    }
  }
}
</style>
