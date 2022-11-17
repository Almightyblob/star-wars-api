<template>
  <div class="w-auto flex flex-col items-center">
    <span class="text-xs text-blue-500 font-bold"> FILTER BY SPECIES </span>
    <select
      type="select"
      v-model="selected"
      class="h-[35px] bg-slate-900 border border-blue-500 rounded-md focus:outline-none | px-2 py-1"
      @input="(e) => store.filterBySpecies(e.target.value)"
    >
      <option value="">No Selection</option>
      <option v-for="species in speciesList" :value="species">
        {{ species }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();

const selected = ref("");
const props = defineProps({
  speciesList: {
    type: Array,
    required: true,
  },
});
function select(e) {
  console.log(e.target.value);
}
</script>
