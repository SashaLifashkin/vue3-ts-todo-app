<script setup lang="ts">
import type { Todo } from '@/types/interfaces';
import { nextTick, reactive, ref } from 'vue';

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits<{
  (e: 'update', $event: Todo): void,
  (e: 'remove'): void,
}>()

const state = reactive({
  editing: false,
  newTitle: props.todo.title,
})
const titleField = ref<HTMLInputElement | null>(null)

function toggle() {
  emit('update', {
    ...props.todo,
    completed: !props.todo.completed
  })
}

function edit() {
  state.newTitle = props.todo.title
  state.editing = true

  nextTick(() => {
    titleField.value?.focus()
  })
}

function rename() {
  if (!state.editing) {
    return
  }

  state.editing = false

  if (state.newTitle === props.todo.title) {
    return
  }

  if (state.newTitle === '') {
    emit('remove')

    return
  }

  emit('update', {
    ...props.todo,
    title: state.newTitle,
  })

  state.newTitle = ''
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
      v-if="state.editing"
      @submit.prevent="rename"
    >
      <input
        type="text"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
        v-model.trim="state.newTitle"
        ref="titleField"
        @keyup.esc="state.editing = false"
        @blur="rename"
      />
    </form>

    <template v-else>
      <span
        class="todo__title"
        @dblclick="edit"
      >
        {{ props.todo.title }}
      </span>
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
