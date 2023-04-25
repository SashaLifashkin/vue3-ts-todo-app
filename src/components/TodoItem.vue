<script setup lang="ts">
import type { Todo } from '@/types/interfaces';

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  (e: 'update', $event: Todo): void,
  (e: 'remove'): void,
}>()

function toggle() {
  emit('update', {
    ...props.todo,
    completed: !props.todo.completed
  })
}
</script>

<template>
  <div
    class="todo"
    :class="{completed: todo.completed}"
  >
    <label class="todo__status-label">
      <input
        type="checkbox"
        class="todo__status"
        :checked="props.todo.completed"
        @change="toggle"
      />
    </label>

    <form
      v-if="false"
    >
      <input
        type="text"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
        value="Todo is being edited now"
      />
    </form>

    <template v-else>
      <span class="todo__title">{{ props.todo.title }}</span>
      <button
        class="todo__remove"
        type="button"
        @click="emit('remove')"
      >
        x
      </button>
    </template>

    <div class="modal overlay" :class="{'is-active': false}">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style>
</style>
