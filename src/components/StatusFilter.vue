<script setup lang="ts">
const props = defineProps<{ value: string }>()
defineEmits<{ (e: 'change', $event: string): void }>()
</script>

<template>
  
  <nav class="filter">
    <a
      href="#/"
      class="filter__link"
      :class="{ selected: props.value === 'all' }"
      @click="$emit('change', 'all')"
    >
      All
    </a>

    <a
      href="#/active"
      class="filter__link"
      :class="{ selected: props.value === 'active' }"
      @click="$emit('change', 'active')"
    >
      Active
    </a>

    <a
      href="#/completed"
      class="filter__link"
      :class="{ selected: props.value === 'completed' }"
      @click="$emit('change', 'completed')"
    >
      Completed
    </a>
        </nav>
</template>

<style>
</style>
