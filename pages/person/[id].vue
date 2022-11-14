<template>
  {{ $route.params.id }}
  {{ store.data[$route.params.id].name }}
</template>

<script setup>
import { useDataStore } from "@/stores/data";
const store = useDataStore();
</script>
