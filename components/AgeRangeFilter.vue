<template>
  <div class="w-[90%]">
    <Slider
      :value="range"
      :min="min"
      :max="max"
      class="slider-blue"
      @input="(value) => setAgeRangeFilter(value)"
    />
  </div>
</template>

<script setup>
import Slider from "@vueform/slider";
import { useDataStore } from "@/stores/data";

const store = useDataStore();

const birth_years = JSON.parse(localStorage.people)
  .map((person) => person.birth_year)
  .map((year) => {
    if (year !== "unknown") return year.slice(0, -3);
  })
  .filter((year) => year !== undefined);

const min = Math.min(...birth_years);
const max = Math.max(...birth_years);
const range = ref([min, max]);

function setAgeRangeFilter(value) {
  range.value = value;
  store.birthYearRange = range.value;
  store.filter();
}
</script>

<style>
@import "@vueform/slider/themes/default.css";
.slider-connect {
  @apply bg-blue-500;
}

.slider-tooltip {
  @apply bg-blue-500 border-blue-500;
}
</style>
