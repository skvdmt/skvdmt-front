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
  gap: 20px;

  .example {
    min-height: 600px;
    background-color: var(--background-color-light);
    flex-grow: 1;
    width: 350px;
    border-radius: 10px;
    @media (max-width: 600px) {
      min-height: auto;
      border-radius: 0;
    }

    padding: 20px;

    @media (max-width: 400px) {
      min-width: 200px;
    }

    img {
      display: block;
      margin: 40px auto;
    }

    .description {
      margin: 0 0 20px;
    }

    .links {
      margin: 0 0 20px;
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      a {
        background-color: var(--background-color-very-light);
        border-radius: 4px;
        padding: 3px 5px;
        text-wrap: nowrap;
      }
    }

    .technologies {
      margin: 0 0 20px;

      .title {
        font-weight: 400;
      }
    }

    .sources {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;

      .title {
        padding: 3px 0;
        font-weight: 400;
      }

      a {
        background-color: var(--background-color-very-light);
        border-radius: 4px;
        padding: 3px 5px;
        text-wrap: nowrap;
      }
    }
  }
}
</style>
