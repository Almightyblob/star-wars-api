<template>
  <p v-if="store.isLoading">Getting data...</p>
  <div v-else>
    <input
      v-model="searchWord"
      type="text"
      @keypress.enter="() => store.search(searchWord)"
    />
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
const searchWord = ref("");
</script>
