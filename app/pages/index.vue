<template>
  <HeaderWrapper />
  <ExamplesWrapper />
  <FavoritesWrapper />
  <FooterWrapper />
</template>

<style>
@import url("@/scss/colors.scss");

@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 300 500;
  font-stretch: 100%;
  font-display: block;
  src:
    url("~/assets/fonts/OpenSans-Latin-Normal.woff2") format("woff2"),
    url("~/assets/fonts/OpenSans-Latin-Normal.woff2") format("woff2-variations");
  unicode-range: U+0000-007F, U+00A0-00FF, U+201A, U+201E, U+201C-201D, U+2026;
}

@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 300 500;
  font-stretch: 100%;
  font-display: block;
  src:
    url("~/assets/fonts/OpenSans-Cyrillic-Normal.woff2") format("woff2"),
    url("~/assets/fonts/OpenSans-Cyrillic-Normal.woff2")
      format("woff2-variations");
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}

@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 300 500;
  font-stretch: 100%;
  font-display: block;
  src:
    url("~/assets/fonts/OpenSans-Symbols-Normal.woff2") format("woff2"),
    url("~/assets/fonts/OpenSans-Symbols-Normal.woff2")
      format("woff2-variations");
  unicode-range:
    U+2013-2014, U+2018-201F, U+2022, U+2026, U+2030, U+20AC, U+20BD, U+2116,
    U+2122, U+2190-2193, U+2212;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  font-size: 62.5%;

  letter-spacing: 0.02em;
  font-weight: 300;
  background-color: var(--background-document);
  color: var(--color);

  body {
    line-height: 1.5;
    font-size: 1.6rem;
    font-family: "Open Sans", sans-serif;
  }

  a {
    color: var(--link-color);
  }

  a:visited {
    color: var(--link-color-visited);
  }

  h1 {
    font-size: 4.8rem;
    font-weight: 500;
    margin: 0 0 1rem;
    line-height: 1.2;
  }

  h2 {
    font-size: 3.2rem;
    font-weight: 400;
    margin: 0 0 1rem;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 350;
    margin: 0 0 1rem;
  }

  p {
    margin: 0 0 1rem;
  }

  a {
    color: var(--link-color);
    text-underline-offset: 0.4rem;
  }

  a:visited {
    color: var(--link-color-visited);
  }

  .container {
    margin: 0 auto;
    padding: 0 3rem;
    max-width: 132rem;
    @media (max-width: 600px) {
      padding: 2rem;
    }
  }

  .examples-wrapper {
    .container {
      @media (max-width: 600px) {
        padding: 0;
      }
    }
  }
}
</style>
