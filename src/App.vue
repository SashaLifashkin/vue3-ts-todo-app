<script setup lang="ts">
import { computed, ref, watch } from 'vue'
// import { todosData } from './data/todos'
import type { Todo } from './types/interfaces'
import StatusFilter from './components/StatusFilter.vue'
import TodoItem from './components/TodoItem.vue'

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
const status = ref('all')
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
        <TodoItem
          v-for="todo, index in todos"
          :key="todo.id"
          :todo="todo"
          @update="todos[index] = $event"
          @remove="todos.splice(index, 1)"
        />
      </section>

      <footer class="todoapp__footer">
        <span class="todo-count">
          {{ activeTodos.length }} items left
        </span>

        <StatusFilter
          v-model="status"
        />

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
