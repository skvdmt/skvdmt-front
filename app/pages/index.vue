<template>
  <HeaderWrapper />
  <ExamplesWrapper />
  <FavoritesWrapper />
  <FooterWrapper />
</template>

<style>
@import url("@/scss/colors.scss");

@font-face {
  font-family: OpenSans;
  src: url("/fonts/OpenSans-VariableFont_wdth,wght.ttf");
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  line-height: 1.5;
  font-weight: 300;
  font-family: OpenSans, serif;
  background-color: var(--background-color-very-dark);
  color: var(--color);

  a {
    color: var(--link-color);
  }

  a:visited {
    color: var(--link-color-visited);
  }

  h1 {
    font-size: 3em;
    font-weight: 500;
    margin: 0;
  }

  h2 {
    font-size: 2em;
    font-weight: 400;
    margin: 0 0 10px;
  }

  h3 {
    font-size: 1.5em;
    font-weight: 350;
    margin: 0 0 10px;
  }

  p {
    margin: 0 0 10px;
  }

  a {
    color: var(--link-color);
    text-underline-offset: 4px;
  }

  a:visited {
    color: var(--link-color-visited);
  }

  .container {
    margin: 0 auto;
    padding: 0 30px;
    max-width: 1320px;
    @media (max-width: 600px) {
      padding: 20px;
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
