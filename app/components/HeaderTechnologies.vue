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
  min-height: 9.4rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 2rem;
  gap: 1rem;

  .technology {
    background-color: var(--background-color-light);
    display: flex;
    padding: 1rem;
    border-radius: 0.8rem;
    align-items: center;

    .name {
      padding-left: 1rem;
      padding-right: 0.8rem;
      text-wrap: nowrap;

      a {
        text-underline-offset: 0.6rem;
      }
    }
  }
}
</style>
