<template>
  <div v-if="!store.isLoading">
    <div
      class="w-[80%] relative | flex flex-row | border-2 border-yellow-400 rounded-lg | p-4 mx-auto mt-8 space-y-2"
    >
      <h2
        class="absolute -top-6 left-2 | text-xl bg-slate-900 text-blue-500 font-bold | p-2"
      >
        {{ store.people[$route.params.id].name }}
      </h2>
      <div class="mr-2">
        <p>Height:</p>
        <p>Hair Color:</p>
        <p>Skin Color:</p>
        <p>Eye Color:</p>
        <p>Birth Year:</p>
        <p>Home Planet:</p>
        <p>Species:</p>
        <p>Films:</p>
      </div>
      <div>
        <p
          class="text-blue-500"
          v-text="store.people[$route.params.id].height"
        />
        <p
          class="text-blue-500"
          v-text="store.people[$route.params.id].hair_color"
        />
        <p
          class="text-blue-500"
          v-text="store.people[$route.params.id].skin_color"
        />
        <p
          class="text-blue-500"
          v-text="store.people[$route.params.id].eye_color"
        />
        <p
          class="text-blue-500"
          v-text="store.people[$route.params.id].birth_year"
        />
        <p
          class="text-blue-500"
          v-text="store.people[$route.params.id].homeworld"
        />
        <p
          class="text-blue-500"
          v-text="store.people[$route.params.id].species"
        />
        <span
          v-for="film in store.people[$route.params.id].films"
          class="text-blue-500 | mr-1"
        >
          {{ film }},
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();
</script>
