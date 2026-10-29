<script setup>
const config = useRuntimeConfig();
const [abou, loca, links] = await Promise.all([
  useFetch(() => `${config.public.apiBase}/text/abou`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/text/loca`, {
    timeout: config.public.timeout,
  }),
  useFetch(() => `${config.public.apiBase}/links`, {
    timeout: config.public.timeout,
  }),
]);
if (abou.error.value || loca.error.value || links.error.value) {
  throw new Error("Error loading data from the server.");
}
</script>

<template>
  <div class="footer-wrapper">
    <div class="container">
      <div class="links">
        <div class="link" v-for="link in links.data.value" :key="link.title">
          <img
            :src="
              '/icons/grey/' +
              link.title.toLowerCase().match(/([^ ]+)/)[1] +
              '.svg'
            "
            :alt="link.title"
          />
          <a :href="link.url">
            <div
              :id="'link_name_' + link.title.toLowerCase().match(/([^ ]+)/)[1]"
            >
              {{ link.title }}
            </div>
            <div
              :id="'link_url_' + link.title.toLowerCase().match(/([^ ]+)/)[1]"
              class="url"
            >
              {{ link.url.replace("https://", "").replace("mailto:", "") }}
            </div>
          </a>
        </div>
      </div>
      <div class="location">
        <p id="copyright">{{ abou.data.value?.text }}</p>
        <p id="location">{{ loca.data.value?.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/scss/colors.scss");

.footer-wrapper {
  padding: 30px 0 50px;
  @media (max-width: 600px) {
    padding: 30px 0 0;
  }

  .links {
    margin: 0 0 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px 20px;

    .link {
      min-height: 106px;
      text-align: center;
      flex-grow: 1;

      img {
        display: block;
        margin: 0 auto 10px;
        width: 48px;
      }

      a {
        color: var(--footer-link-color-title);
        line-height: 1.5em;
        text-underline-offset: 6px;
        text-wrap: nowrap;

        .url {
          font-size: 14px;
          color: var(--footer-link-color-url);
        }
      }

      a:visited {
        color: var(--footer-link-color-title);
      }
    }
  }

  .location {
    color: var(--location-color);
    text-align: center;
    font-size: 0.9em;

    p {
      min-height: 21px;
    }
  }
}
</style>
