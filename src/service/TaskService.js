const BASE_URL = 'https://8ff8-2806-103e-27-38b4-80c5-add3-5c4f-5790.ngrok-free.app/api/'

export default class TaskService {
  async getTasks() {
    const response = await fetch(`${BASE_URL}task`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  async createTask(task) {
    const response = await fetch(`${BASE_URL}task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  async updateTask(task) {
    const response = await fetch(`${BASE_URL}task/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(task),
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  async deleteTask(taskId) {
    const response = await fetch(`${BASE_URL}task/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  async changeStateTask(stateId, taskId) {
    const response = await fetch(`${BASE_URL}task/${taskId}/state/${stateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }
}
