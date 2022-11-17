<template>
  <div v-if="!store.isLoading">
    <p>Name: {{ store.people[$route.params.id].name }}</p>
    <p>Height: {{ store.people[$route.params.id].height }}</p>
    <p>Hair Color: {{ store.people[$route.params.id].hair_color }}</p>
    <p>Skin Color: {{ store.people[$route.params.id].skin_color }}</p>
    <p>Eye Color: {{ store.people[$route.params.id].eye_color }}</p>
    <p>Birth year: {{ store.people[$route.params.id].birth_year }}</p>
    <p>Home Planet: {{ store.people[$route.params.id].homeworld }}</p>
    <p>Species: {{ store.people[$route.params.id].species }}</p>
    <p>
      Films:
      <span v-for="film in store.people[$route.params.id].films" class="mr-1">
        {{ film }},
      </span>
    </p>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();
</script>
