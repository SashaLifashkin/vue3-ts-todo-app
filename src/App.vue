<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
// import { todosData } from './data/todos'
import type { Todo } from './types/interfaces'
import StatusFilter from './components/StatusFilter.vue'
import TodoItem from './components/TodoItem.vue'
import ErrorMessage  from './components/ErrorMessage.vue'
import { createTodo, deleteTodo, getTodos, updateTodo } from './data/todos'

// const todos = ref<Todo[]>(todosData)
let todos = ref<Todo[]>([])
// const jsonData = ref<string>(localStorage.getItem('todos') || '[]')
// const jsonData = localStorage.getItem('todos') || '[]'
// try {
//   todos.value = JSON.parse(jsonData)
// } catch (e) {
//   throw new Error()
// }

const title = ref<string>('')
const status = ref('all')
// const errorMessage = ref('')
const errorMessage = ref<InstanceType<typeof ErrorMessage> | null>(null)
const activeTodos = computed<Todo[]>(() => todos.value.filter(todo => !todo.completed))
const comletedTodos = computed<Todo[]>(() => todos.value.filter(todo => todo.completed))
const visibleTodos = computed<Todo[]>(() => {
  switch (status.value) {
    case 'active':
      return activeTodos.value

    case 'completed':
      return comletedTodos.value

    default:
      return todos.value
  }
})

onMounted(async () => {
  try {
    todos.value = await getTodos().then(() => Promise.reject())
  } catch {
    // errorMessage.value = 'Unable to load todos'
    errorMessage.value?.show('Unable to load todos')
  }
})

// watch(
//   todos.value,
//   () => {
//     localStorage.setItem('todos', JSON.stringify(todos.value))
//   }
// )

const getLastId = (todos: Todo[]): number => {
  const ids: number[] = []

  for (let todo of todos) {
    ids.push(todo.id)
  }

  return Math.max(...ids);
}

const hanleSubmit = async () => {
  // const { id, title, completed } = await createTodos(title.value) // вызывает ошибку c title
  const result = await createTodo(title.value)

  // todos.value.push({ id: result.id, title: result.title, completed: result.completed })
  todos.value.push(result)
  title.value = ''

  // todos.value.push({
  //   id: getLastId(todos.value) + 1,
  //   title: title.value,
  //   completed: false,
  // })

  // title.value = ''
}

// const updateTodoApi = ({ id, title, completed }: Todo) => {
//   updateTodo({ id, title, completed }).then(
//     (result) => {
//       todos.value = todos.value.map(todo => todo.id !== id ? todo : result)
//     }
//   )
// }

const updateTodoApi = async ({ id, title, completed }: Todo) => {
  const result = await updateTodo({ id, title, completed })
  todos.value = todos.value.map(todo => todo.id !== id ? todo : result)
}

const removeTodo = async (id: number) => {
  await deleteTodo(id)
  todos.value = todos.value.filter(todo => todo.id !== id)
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

      <TransitionGroup
        class="todoapp__main"
        name="list"
        tag="section"
      >
        <TodoItem
          v-for="todo of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="updateTodoApi"
          @remove="removeTodo(todo.id)"
        />
      </TransitionGroup >

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

    <ErrorMessage
      class="is-warning"
      ref="errorMessage"
    >
      <template #default="{ text }">
        <p>{{ text }}</p>
        <button @click="errorMessage?.hide()">X</button>
      </template>
      <template #header>
        <p>Server Error</p>
      </template>
    </ErrorMessage>
    <!-- <ErrorMessage
      class="is-warning"
      :active="errorMessage !== ''"
      @hide="errorMessage = ''"
    >
      <template #default="{ why, x}">
        <p>{{ errorMessage }} {{ why }} {{ x }}</p>
      </template>
      <template #header>
        <p>Server Error</p>
      </template>
    </ErrorMessage> -->
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  max-height: 60px;
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0);
}
</style>
