<template>
  <div class="inline">
    <div
      v-for="movie in movieList"
      class="flex flex-row items-center space-x-1 mb-1"
    >
      <input
        v-model="movies"
        class="accent-yellow-400"
        type="checkbox"
        :value="movie"
        @change="() => store.filterByMovies(movies)"
      />
      <span class="text-xs text-blue-500" v-text="movie" />
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";

const store = useDataStore();
const props = defineProps({
  movieList: {
    type: Array,
    required: true,
  },
});
const movies = ref([]);
</script>
