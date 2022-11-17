<template>
  <div class="pt-8 px-4">
    <header>
      <h1 class="text-3xl text-center | mb-4">Star Wars API</h1>
    </header>
    <div>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();
if (!localStorage.people) store.fetchData();
</script>

<style>
html {
  @apply bg-slate-900 text-yellow-400;
}
</style>
