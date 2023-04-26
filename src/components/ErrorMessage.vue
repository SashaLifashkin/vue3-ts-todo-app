<script setup lang="ts">
defineProps<{ active: boolean }>()
const emit = defineEmits<{
  (e: 'hide'): void,
}>()
</script>

<template>
  <article
    class="message"
    :class="{ 'message--hidden': !active }"
  >
    <div class="message-header">
      <slot name="header"></slot>
      <button class="delete" @click="emit('hide')"></button>
    </div>

    <div class="message-body">
      <slot why="Promise rejected" :x="502"></slot>
    </div>
  </article>
</template>

<style>
</style>
