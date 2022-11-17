<template>
  <p v-if="store.isLoading">Getting data...</p>
  <div v-else>
    <div class="flex flex-row justify-center items-center | space-x-4 | mb-4">
      <TextSearch />
      <SpeciesFilter :speciesList="species || []" />
      <RangeFilter />
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
const species = localStorage.species ? JSON.parse(localStorage.species) : [];
</script>
