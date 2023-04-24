<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { todosData } from './data/todos'
import type { Todo } from './types/interfaces';

// const todos = ref<Todo[]>(todosData)
let todos = ref<Todo[]>([])
// const jsonData = ref<string>(localStorage.getItem('todos') || '[]')
const jsonData = localStorage.getItem('todos') || '[]'
try {
  todos.value = JSON.parse(jsonData)
} catch (e) {
  throw new Error()
}

const title = ref<string>('')
const activeTodos = computed<Todo[]>(() => todos.value.filter(todo => !todo.completed))

watch(
  todos.value,
  () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }
)

const getLastId = (todos: Todo[]): number => {
  const ids: number[] = []

  for (let todo of todos) {
    ids.push(todo.id)
  }

  return Math.max(...ids);
}

const hanleSubmit = () => {
  todos.value.push({
    id: getLastId(todos.value) + 1,
    title: title.value,
    completed: false,
  })

  title.value = ''
}
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button class="todoapp__toggle-all" :class="{active: activeTodos.length === 0}"></button>

        <form @submit.prevent="hanleSubmit">
          <input
            type="text"
            class="todoapp__new-todo"
            placeholder="What needs to be done?"
            v-model="title"
          />
        </form>
      </header>

      <section class="todoapp__main"
      >
        <div
          v-for="todo, index in todos"
          :key="todo.id"
          class="todo"
          :class="{completed: todo.completed}"
        >
          <label class="todo__status-label">
            <input
              type="checkbox"
              class="todo__status"
              v-model="todo.completed"
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
            <span class="todo__title">{{ todo.title }}</span>
            <button
              class="todo__remove"
              type="button"
              @click="todos.splice(index, 1)"
            >
              x
            </button>
          </template>

          <div class="modal overlay" :class="{'is-active': false}">
            <div class="modal-background has-background-white-ter"></div>
            <div class="loader"></div>
          </div>
        </div>
      </section>

      <footer class="todoapp__footer">
        <span class="todo-count">
          {{ activeTodos.length }} items left
        </span>

        <nav class="filter">
          <a
            href="#/"
            class="filter__link selected"
          >
            All
          </a>

          <a
            href="#/active"
            class="filter__link"
          >
            Active
          </a>

          <a
            href="#/completed"
            class="filter__link"
          >
            Completed
          </a>
        </nav>

        <button class="todoapp__clear-completed" v-if="activeTodos.length > 0">
          Clear completed
        </button>
      </footer>
    </div>

    <article class="message is-danger message--hidden">
      <div class="message-header">
        <p>Error</p>
        <button class="delete"></button>
      </div>

      <div class="message-body">
        Unable to add a Todo
      </div>
    </article>
  </div>
</template>

<style scoped>

</style>
