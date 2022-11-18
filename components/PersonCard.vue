<template>
  <div
    class="grid grid-cols-4 | border border-yellow-400 rounded-md | transition duration-100 hover:translate-x-2 hover:bg-blue-500 hover:border-blue-500 active:bg-yellow-400 hover:text-slate-900 | p-2 m-2"
  >
    <p v-text="person.name" />
    <p v-text="person.birth_year" />
    <p v-text="person.species" />
    <ul>
      <li v-for="film in person.films" v-text="film"></li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  person: {
    type: Object,
    required: true,
  },
});
</script>
