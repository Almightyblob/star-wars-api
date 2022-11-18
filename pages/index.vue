<template>
  <p v-if="store.isLoading">
    Getting data... depending on the mood of SWAPI, this may take some time
  </p>
  <div v-else>
    <div class="grid grid-cols-4 justify-center items-center | mb-4 m-2 mt-8">
      <div class="h-full">
        <p class="text-xs text-blue-500 font-bold | mb-2">SEARCH BY NAME</p>
        <TextSearch />
      </div>

      <div class="h-full | space-y-12">
        <p class="text-xs text-blue-500 font-bold | mb-2">
          SEARCH BY BIRTHYEAR (BBY)
        </p>
        <AgeRangeFilter />
      </div>

      <div class="h-full">
        <p class="text-xs text-blue-500 font-bold | mb-2">
          SEARCH BY SPECIES (hold CTRL for multiple)
        </p>
        <SpeciesFilter :speciesList="species" />
      </div>

      <div class="h-full">
        <p class="text-xs text-blue-500 font-bold | mb-2">SEARCH BY MOVIES</p>
        <MoviesFilter :movieList="movies" />
      </div>
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
