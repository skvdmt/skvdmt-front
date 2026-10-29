<script setup>
const config = useRuntimeConfig();
const exam = await useFetch(() => `${config.public.apiBase}/text/exam`, {
  timeout: config.public.timeout,
});
if (exam.error.value) {
  throw new Error("Error loading data from the server.");
}
</script>

<template>
  <div class="examples-wrapper">
    <div class="container">
      <h2 id="examples_header">{{ exam.data.value?.text }}</h2>
      <ExampleList />
    </div>
  </div>
</template>

<style scoped>
.examples-wrapper {
  padding: 30px 0;

  h2 {
    text-align: center;
    min-height: 48px;
    margin: 0 0 20px;
  }
}
</style>
