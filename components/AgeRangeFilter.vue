<template>
  <div class="w-[90%]">
    <Slider v-model="range" :min="min" :max="max" class="slider-blue" />
  </div>
</template>

<script setup>
import Slider from "@vueform/slider";
const birth_years = JSON.parse(localStorage.people)
  .map((person) => person.birth_year)
  .map((year) => {
    if (year !== "unknown") return year.slice(0, -3);
  })
  .filter((year) => year !== undefined);

const min = Math.min(...birth_years);
const max = Math.max(...birth_years);
const range = ref([min, max]);
</script>

<style src="@vueform/slider/themes/default.css">
.slider-blue {
  --slider-connect-bg: #3b82f6;
  --slider-tooltip-bg: #3b82f6;
  --slider-handle-ring-color: #3b82f630;
}
</style>
