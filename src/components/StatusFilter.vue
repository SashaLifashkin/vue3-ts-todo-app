<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
defineEmits<{ (e: 'update:modelValue', $event: string): void }>()
</script>

<template>
  
  <nav class="filter">
    <a
      href="#/"
      class="filter__link"
      :class="{ selected: props.modelValue === 'all' }"
      @click="$emit('update:modelValue', 'all')"
    >
      All
    </a>

    <a
      href="#/active"
      class="filter__link"
      :class="{ selected: props.modelValue === 'active' }"
      @click="$emit('update:modelValue', 'active')"
    >
      Active
    </a>

    <a
      href="#/completed"
      class="filter__link"
      :class="{ selected: props.modelValue === 'completed' }"
      @click="$emit('update:modelValue', 'completed')"
    >
      Completed
    </a>
        </nav>
</template>

<style>
</style>
