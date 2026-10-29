<script setup>
const config = useRuntimeConfig();
const libs = await useFetch(() => `${config.public.apiBase}/libs`, {
  timeout: config.public.timeout,
});
if (libs.error.value) {
  throw new Error("Error loading data from the server.");
}
</script>

<template>
  <div class="libs">
    <a
      :id="
        'favorites_lib_' +
        lib.url.match(/([^\/]+\/[^\/]+)$/)[1].replaceAll('/', '_')
      "
      v-for="lib in libs.data.value"
      :key="lib.url"
      :href="lib.url"
      >{{ lib.url.match(/([^\/]+\/[^\/]+)$/)[1] }}</a
    >
  </div>
</template>

<style scoped>
@import url("@/scss/colors.scss");

.libs {
  min-height: 30px;
  text-align: center;
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;

  a {
    background-color: var(--background-color-very-light);
    border-radius: 4px;
    padding: 3px 5px;
    text-wrap: nowrap;
  }
}
</style>
