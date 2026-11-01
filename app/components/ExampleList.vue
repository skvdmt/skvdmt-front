<script setup>
const config = useRuntimeConfig();
const examples = await useFetch(() => `${config.public.apiBase}/examples`, {
  timeout: config.public.timeout,
});
if (examples.error.value) {
  throw new Error("Error loading data from the server.");
}
examples.data.value.forEach((ex) => {
  let ts = "";
  ex.technologies.forEach((tech, i) => {
    if (i === ex.technologies.length - 1) {
      ts += tech.title + ".";
    } else {
      ts += tech.title + ", ";
    }
  });
  ex.technologiesString = ts;
  ex.descriptionArray = ex.description.split("\r\n");
});
</script>

<template>
  <div class="examples">
    <div
      class="example"
      v-for="example in examples.data.value"
      :key="example.name"
    >
      <img :src="'/icons/grey/' + example.name + '.svg'" :alt="example.name" />
      <h3 :id="'example_name_' + example.name">{{ example.title }}</h3>
      <div class="description">
        <p v-for="(descString, index) in example.descriptionArray" :key="index">
          {{ descString }}
        </p>
      </div>
      <div class="links" v-if="example.links">
        <a :href="link.url" v-for="link in example.links" :key="link.title">{{
          link.title
        }}</a>
      </div>
      <div class="technologies">
        <span class="title">Technologies</span>:
        {{ example.technologiesString }}
      </div>
      <div class="sources">
        <div class="title">Sources:</div>
        <a
          :href="source.url"
          v-for="source in example.sources"
          :key="source.url"
          >{{ source.url.replace(/(.*\/)/s, "") }}</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/scss/colors.scss");

.examples {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;

  .example {
    min-height: 60rem;
    background-color: var(--background-color-light);
    flex-grow: 1;
    width: 35rem;
    border-radius: 1rem;
    @media (max-width: 60rem) {
      min-height: auto;
      border-radius: 0;
    }

    padding: 2rem;

    @media (max-width: 400px) {
      min-width: 20rem;
    }

    h3 {
      margin-left: -0.05em;
    }

    img {
      display: block;
      margin: 4rem auto;
    }

    .description {
      margin: 0 0 2rem;
    }

    .links {
      margin: 0 0 2rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      a {
        background-color: var(--background-color-very-light);
        border-radius: 0.4rem;
        padding: 0.3rem 0.5rem;
        text-wrap: nowrap;
      }
    }

    .technologies {
      margin: 0 0 2rem;

      .title {
        font-weight: 400;
      }
    }

    .sources {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;

      .title {
        padding: 0.3rem 0;
        font-weight: 400;
      }

      a {
        background-color: var(--background-color-very-light);
        border-radius: 0.4rem;
        padding: 0.3rem 0.5rem;
        text-wrap: nowrap;
      }
    }
  }
}
</style>
