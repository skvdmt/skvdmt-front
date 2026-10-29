<script setup>
const config = useRuntimeConfig();
const software = await useFetch(() => `${config.public.apiBase}/software`, {
  timeout: config.public.timeout,
});
if (software.error.value) {
  throw new Error("Error loading data from the server.");
}
</script>

<template>
  <div class="soft">
    <div class="app" v-for="app in software.data.value" :key="app.title">
      <img
        :src="
          '/icons/colored/' +
          app.title.toLowerCase().replaceAll(' ', '_').replaceAll('/', '') +
          '.svg'
        "
        :alt="app.title"
        width="64px"
        height="64px"
      />
      <a
        :id="
          'favorites_software_' +
          app.title.toLowerCase().replaceAll(' ', '_').replaceAll('/', '')
        "
        :href="app.url"
        >{{ app.title }}</a
      >
    </div>
  </div>
</template>

<style scoped>
@import url("@/scss/colors.scss");

.soft {
  margin: 0 0 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  .app {
    background-color: var(--background-color-dark);
    text-align: center;
    flex-grow: 1;
    width: 220px;
    min-height: 138px;
    border-radius: 10px;
    padding: 20px;

    @media (max-width: 768px) {
      width: 100px;
    }

    img {
      display: block;
      margin: 0 auto 10px;
    }

    a {
      text-underline-offset: 6px;
    }
  }
}
</style>
