<template>
  <div class="w-[90%] flex flex-col">
    <select
      multiple
      v-model="selected"
      class="bg-slate-900 border border-blue-500 rounded-md focus:outline-none | p-1"
      @change="() => setSpeciesFilter(selected)"
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

function setSpeciesFilter(selectedSpecies) {
  store.filteredSpecies = selectedSpecies;
  store.filter();
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
