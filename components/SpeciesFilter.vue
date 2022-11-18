<template>
  <div class="w-[90%] flex flex-col">
    <span class="text-xs text-blue-500 font-bold"> FILTER BY SPECIES </span>
    <select
      multiple
      v-model="selected"
      class="bg-slate-900 border border-blue-500 rounded-md focus:outline-none | p-1"
      @change="(e) => store.filterBySpecies(selected)"
    >
      <option v-for="species in speciesList" :value="species">
        {{ species }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();

const selected = ref([]);
const props = defineProps({
  speciesList: {
    type: Array,
    required: true,
  },
});
function select(e) {
  console.log(selected);
}
</script>

<style>
@import "https://unpkg.com/vue-select@3.0.0/dist/vue-select.css";
.v-select {
  @apply bg-slate-900 rounded-md border border-blue-500;
}
.vs__dropdown-menu {
  @apply bg-slate-900 text-blue-500;
}
</style>
