<script setup>
const config = useRuntimeConfig();

const defaultTitle = "Dmitry Skidanov";
const defaultDescription =
  "List of technologies, examples of developments, application source code, links to repositories, contact information.";
const defaultKeywords =
  "Go, Postgres, Docker, REST API, gRPC, Git, CI/CD, JavaScript, Vue, Nuxt";

const [main, prof, tech] = await Promise.all([
  useFetch(() => `${config.public.apiBase}/text/main`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/prof`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/tech`, {
    timeout: config.public.timeout,
  }),
]);

if (main.error.value || prof.error.value || tech.error.value) {
  throw new Error("Error loading data from the server.");
}

const mainText = main.data.value?.text;
const profText = prof.data.value?.text;
const title = mainText && profText ? `${mainText} - ${profText}` : defaultTitle;

useSeoMeta({
  title: title,
  description: defaultDescription,
  keywords: defaultKeywords,
  ogTitle: title,
});
</script>

<template>
  <div class="header-wrapper">
    <div class="container">
      <div class="header">
        <div class="about">
          <h1 id="main_header">{{ main.data.value?.text }}</h1>
          <p id="profession" class="profession">{{ prof.data.value?.text }}</p>
          <h2 id="second_header">{{ tech.data.value?.text }}</h2>
          <HeaderTechnologies />
        </div>
        <div class="photo"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/scss/colors.scss");

.header-wrapper {
  padding: 50px 0 30px;
  @media (max-width: 600px) {
    padding: 0 0 30px;
  }

  .header {
    display: flex;
    justify-content: space-between;

    .about {
      width: 55%;

      @media (max-width: 768px) {
        width: 100%;
      }

      align-self: center;

      h1 {
        min-height: 72px;
      }

      .profession {
        font-size: 1.2em;
        margin: 0 0 30px;
        min-height: 29px;
      }

      h2 {
        min-height: 48px;
      }
    }

    .photo {
      width: 45%;
      display: flex;
      align-self: flex-end;
      object-fit: contain;
      min-height: 400px;
      background-image:
        light-dark(
          linear-gradient(
            to right,
            var(--photo-gradient-color) 15%,
            transparent 30%
          ),
          linear-gradient(
            to right,
            var(--photo-gradient-color) 5%,
            transparent 20%
          )
        ),
        light-dark(
          linear-gradient(
            to left,
            var(--photo-gradient-color) 15%,
            transparent 30%
          ),
          linear-gradient(
            to left,
            var(--photo-gradient-color) 5%,
            transparent 20%
          )
        ),
        light-dark(
          linear-gradient(
            to top,
            var(--photo-gradient-color) 5%,
            transparent 20%
          ),
          linear-gradient(
            to top,
            var(--photo-gradient-color) 5%,
            transparent 20%
          )
        ),
        light-dark(url(/images/photo-light.webp), url(/images/photo-dark.webp));

      background-repeat: no-repeat;
      background-position: center bottom;
      background-size: contain;

      @media (max-width: 768px) {
        display: none;
      }

      .skeleton {
        margin-left: 20px;
        width: 100%;
      }
    }
  }
}
</style>
