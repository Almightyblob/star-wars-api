<template>
  <div class="grid grid-cols-4 | border border-yellow-400 rounded-md | p-2 m-2">
    <p v-text="person.name" />
    <p v-text="person.birth_year" />
    <p v-text="person.species" />
    <p v-text="person.name" />
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
