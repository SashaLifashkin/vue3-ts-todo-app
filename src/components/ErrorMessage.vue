<script setup lang="ts">
import { ref } from 'vue';

// defineProps<{ active: boolean }>()
// const emit = defineEmits<{
//   (e: 'hide'): void,
// }>()

const errorText = ref('')

defineExpose({
  hide,
  show,
})

function hide() {
  errorText.value = ''
}

function show(text: string) {
  errorText.value = text
}
</script>

<template>
  <article
    class="message"
    :class="{ 'message--hidden': errorText === '' }"
  >
    <div class="message-header">
      <slot name="header"></slot>
      <button class="delete" @click="hide"></button>
    </div>

    <div class="message-body">
      <slot :text="errorText"></slot>
    </div>
  </article>
</template>

<style>
</style>
