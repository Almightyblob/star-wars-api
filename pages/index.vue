<template>
  <p v-if="store.isLoading">Getting data...</p>
  <div v-else>
    <div class="grid grid-cols-4 justify-center items-center | mb-4 m-2">
      <TextSearch />
      <AgeRangeFilter />
      <SpeciesFilter :speciesList="species" />
      <MoviesFilter :movieList="movies" />
    </div>
    <RouterLink
      v-for="(person, index) in store.searchResults"
      :to="'/person/' + index"
      :key="person.name"
      class="block"
    >
      <PersonCard :person="person" />
    </RouterLink>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();
const species = store.species;
const movies = store.movies;
</script>
