const baseURL = 'http://localhost:3000'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${baseURL}/todos`)
  return response.json()
}

export const getTodoById = async (id: string): Promise<Todo> => {
  const response = await fetch(`${baseURL}/todos/${id}`)
  return response.json()
}

export const createTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${baseURL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  return response.json()
}

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${baseURL}/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  return response.json()
}
