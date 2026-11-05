<script setup>
const config = useRuntimeConfig();

const defaultTitle = "Dmitry Skidanov";
const defaultDescription =
  "List of technologies, examples of developments, application source code, links to repositories, contact information.";
const defaultKeywords =
  "Go, Postgres, Docker, REST API, gRPC, Git, CI/CD, JavaScript, Vue, Nuxt";

const [main, runm, prof, dist, high, tech] = await Promise.all([
  useFetch(() => `${config.public.apiBase}/text/main`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/runm`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/prof`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/dist`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/high`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/tech`, {
    timeout: config.public.timeout,
  }),
]);

if (
  main.error.value ||
  runm.error.value ||
  prof.error.value ||
  dist.error.value ||
  high.error.value ||
  tech.error.value
) {
  throw new Error("Error loading data from the server.");
}

const mainText = main.data.value?.text;
const runmText = runm.data.value?.text;
const profText = prof.data.value?.text;
const title =
  mainText && profText
    ? `${mainText} (${runmText}) — ${profText}`
    : defaultTitle;

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
          <h1 id="main_header">
            {{ main.data.value?.text }}
            <div class="ru">{{ runm.data.value?.text }}</div>
          </h1>
          <p id="profession" class="profession">
            <span class="prof">{{ prof.data.value?.text }}</span>
            <span class="dist">{{ dist.data.value?.text }}</span>
            <span class="high">{{ high.data.value?.text }}</span>
          </p>
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
  padding: 5rem 0 3rem;
  @media (max-width: 600px) {
    padding: 0 0 3rem;
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
        margin-left: -0.05em;
        div.ru {
          margin-left: 0.1em;
          font-size: 1.8rem;
          font-weight: 400;
          color: var(--runm-color);
        }
      }

      .profession {
        font-size: 2rem;
        line-height: 1.2;
        margin: 0 0 3rem;
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        .prof,
        .dist,
        .high {
          overflow-wrap: break-word;
        }
      }

      h2 {
        min-height: 4.8rem;
      }
    }

    .photo {
      width: 45%;
      display: flex;
      align-self: flex-end;
      object-fit: contain;
      min-height: 40rem;
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
        margin-left: 2rem;
        width: 100%;
      }
    }
  }
}
</style>
