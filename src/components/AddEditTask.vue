<template>
  <AlertModal
    :title="alert.title"
    :message="alert.message"
    :variant="alert.variant"
    :show-modal="alert.alertModal"
    @update:showModal="alert.alertModal = $event"
  />
  <button
    @click="openModal"
    :class="{
      'flex items-center gap-2 px-3 py-2 rounded-lg shadow-md cursor-pointer text-md font-light': true,
      'bg-blue-500 text-white hover:bg-blue-600': !isEditing,
      'bg-teal-500 text-white hover:bg-teal-600': isEditing,
    }"
  >
    <span class="material-symbols-outlined">
      {{ isEditing ? 'edit_square' : 'add' }}
    </span>
    {{ isEditing ? 'Editar' : 'Agregar' }}
  </button>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
    <div class="bg-white p-6 rounded-lg shadow-lg containerModal">
      <h2 class="text-xl mb-4">{{ isEditing ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
      <form @submit.prevent="submitTask">
        <div class="mb-4">
          <label for="title" class="block text-gray-700">Título:</label>
          <input
            type="text"
            id="title"
            v-model="taskData.title"
            class="w-full px-3 py-2 border rounded-lg"
            required
          />
          <p v-if="errors.title" class="text-red-500">{{ errors.title }}</p>
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700">Descripción:</label>
          <textarea
            id="description"
            v-model="taskData.description"
            class="w-full px-3 py-2 border rounded-lg h-40"
            required
          ></textarea>
          <p v-if="errors.description" class="text-red-500">{{ errors.description }}</p>
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="cancelModal"
            class="bg-neutral-600 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 cursor-pointer"
          >
            {{ isEditing ? 'Guardar' : 'Agregar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AlertModal from './AlertModal.vue'
import TaskService from '../service/TaskService'

export default {
  name: 'NewTask',
  components: {
    AlertModal,
  },
  props: {
    task: {
      type: Object,
      default: () => null,
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    refreshFunction: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      TaskService: new TaskService(),
      showModal: false,
      alert: {
        title: '',
        message: '',
        variant: 'add',
        alertModal: false,
      },
      taskData: {
        title: '',
        description: '',
        state_id: 3,
      },
      errors: {
        title: '',
        description: '',
      },
    }
  },
  methods: {
    openModal() {
      this.showModal = true
      if (this.isEditing) {
        this.taskData = { ...this.task }
      }
    },
    cancelModal() {
      this.showModal = false
      this.resetForm()
    },
    validateTask(task) {
      this.errors = {
        title: task.title && task.title.trim() ? '' : 'La tarea necesita un título',
        description:
          task.description && task.description.trim() ? '' : 'La tarea debe tener una descripción',
      }
      return !this.errors.title && !this.errors.description
    },
    async submitTask() {
      if (this.validateTask(this.taskData)) {
        if (this.isEditing) {
          try {
            await this.TaskService.updateTask(this.taskData)
            this.showModal = false
            this.alert = {
              title: '¡Tarea actualizada!',
              message: 'La tarea se actualizó correctamente',
              variant: 'edit',
              alertModal: true,
            }
            this.refreshFunction()
          } catch (error) {
            this.alert = {
              title: 'Oops! Ocurrió un error',
              message: 'Ocurrio un error al actualizar la tarea' + error,
              variant: 'error',
              alertModal: true,
            }
          }
        } else {
          try {
            await this.TaskService.createTask(this.taskData)
            this.showModal = false
            this.alert = {
              title: '¡Nueva tarea agregada!',
              message: 'La tarea se agrego correctamente',
              variant: 'add',
              alertModal: true,
            }
            this.resetForm()
            this.refreshFunction()
          } catch (error) {
            this.alert = {
              title: 'Oops! Ocurrió un error',
              message: 'Ocurrio un error al agregar la tarea' + error,
              variant: 'error',
              alertModal: true,
            }
          }
        }
      } else {
        this.alert = {
          title: 'Oops! Ocurrió un error',
          message: 'Por favor, completa los campos requeridos',
          variant: 'error',
          alertModal: true,
        }
      }
    },
    resetForm() {
      this.taskData = { title: '', description: '', state: 'pendiente' }
      this.errors = { title: '', description: '' }
    },
  },
}
</script>

<style scoped>
.containerModal {
  margin: 2rem;
  width: 100%;
  @media (width >= 40rem) {
    max-width: 40rem;
  }
  @media (width >= 48rem) {
    max-width: 48rem;
  }
  @media (width >= 64rem) {
    max-width: 64rem;
  }
}
</style>
