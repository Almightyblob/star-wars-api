<template>
  <div class="w-auto flex flex-col items-center">
    <span class="text-xs text-blue-500 font-bold"> SEARCH BY NAME </span>
    <input
      v-model="searchWord"
      type="text"
      @keypress.enter="() => store.search(searchWord)"
      class="bg-slate-900 text-blue-500 border border-blue-500 rounded-md focus:outline-none px-2 py-1"
    />
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();
const searchWord = ref("");
</script>
