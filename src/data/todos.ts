import type { Todo } from "@/types/interfaces"

const BASE_URL = 'https://mate.academy/students-api'

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos?userId=6342`)

  if (!response.ok) {
    throw new Error('Error of loading')
  }

  return response.json()
}

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Access-Control-Request-Method': 'POST',
    },
    body: JSON.stringify({
      title,
      completed: false,
      userId: 6342,
    })
  })

  if (!response.ok) {
    throw new Error('Error of loading')
  }

  return response.json()
}

export const updateTodo = async ({ id, title, completed }: Todo): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      completed,
    })
  })

  if (!response.ok) {
    throw new Error('Error of loading')
  }

  return  response.json()
}

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/todos/${id}`, { method: 'DELETE' })
}

// export const todosData = [
//   { id: 1, title: 'HTML + CSS', completed: true },
//   { id: 2, title: 'JS', completed: false },
//   { id: 3, title: 'React', completed: false },
//   { id: 4, title: Vue.js', completed: false },
// ];

// export default [
//   { id: 1, title: 'HTML + CSS', completed: true },
//   { id: 2, title: 'JS', completed: false },
//   { id: 3, title: 'React', completed: false },
//   { id: 4, title: 'Vue.js', completed: false },
// ];
