<script setup>
const config = useRuntimeConfig();
const technologies = await useFetch(
  () => `${config.public.apiBase}/technologies`,
  { timeout: config.public.timeout },
);
if (technologies.error.value) {
  throw new Error("Error loading data from the server.");
}
</script>

<template>
  <div class="technologies">
    <div
      class="technology"
      v-for="technology in technologies.data.value"
      :key="technology.title"
    >
      <img
        :src="
          '/icons/colored/' +
          technology.title.toLowerCase().replace(' ', '_').replace('/', '') +
          '.svg'
        "
        :alt="technology.title"
        width="32px"
        height="32px"
      />
      <div
        :id="
          'technology_name_' +
          technology.title.toLowerCase().replace(' ', '_').replace('/', '')
        "
        class="name"
      >
        <a :href="technology.url">{{ technology.title }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/scss/colors.scss");

.technologies {
  min-height: 94px;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.3em;
  gap: 10px;

  .technology {
    background-color: var(--background-color-light);
    display: flex;
    padding: 10px;
    border-radius: 8px;
    align-items: center;

    .name {
      padding-left: 10px;
      padding-right: 8px;
      text-wrap: nowrap;

      a {
        text-underline-offset: 6px;
      }
    }
  }
}
</style>
