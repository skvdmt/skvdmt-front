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
  font-size: 62.5%;

  letter-spacing: 0.02em;
  font-weight: 300;
  background-color: var(--background-color-very-dark);
  color: var(--color);

  body {
    line-height: 1.5;
    font-size: 1.6rem;
    font-family: OpenSans, serif;
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
    margin: 0;
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
