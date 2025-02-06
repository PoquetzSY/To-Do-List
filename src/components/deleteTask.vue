<template>
  <AlertModal
    :title="alert.title"
    :message="alert.message"
    :variant="alert.variant"
    :show-modal="alert.alertModal"
    @update:showModal="alert.alertModal = $event"
  />
  <span class="material-symbols-outlined text-red-600 cursor-pointer" @click="openModal">
    delete
  </span>

  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
    <div class="bg-white p-6 rounded-lg shadow-lg containerDelete flex flex-col gap-4 items-center">
      <h2 class="text-2xl font-semibold text-center">¿Deseas borrar esta tarea?</h2>
      <img src="/assets/img/gatito-question.png" alt="gatito icono" class="size-16" />
      <p class="text-center">Una vez la borres ya no hay vuelta atras</p>
      <div class="flex justify-center gap-4">
        <button
          @click="cancelModal"
          class="bg-neutral-600 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          @click="deleteTask"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Borrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from '@/service/TaskService'
import AlertModal from './AlertModal.vue'

export default {
  name: 'deleteTask',
  components: {
    AlertModal,
  },
  props: {
    task: {
      type: Object,
      default: () => null,
    },
    refreshFunction: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      showModal: false,
      TaskService: new TaskService(),
      alert: {
        title: '',
        message: '',
        variant: 'delete',
        alertModal: false,
      },
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    cancelModal() {
      this.showModal = false
    },
    async deleteTask() {
      try {
        await this.TaskService.deleteTask(this.task.id)
        this.showModal = false
        this.alert = {
          title: 'Tarea eliminada',
          message: 'La tarea se ha eliminado correctamente',
          variant: 'delete',
          alertModal: true,
        }
        this.refreshFunction()
      } catch (error) {
        this.alert = {
          title: 'Oops! Ocurrió un error',
          message: 'Ocurrio un error al cambiar el estado de la tarea' + error,
          variant: 'error',
          alertModal: true,
        }
      }
    },
  },
}
</script>

<style scoped>
.containerDelete {
  margin: 2rem;
  width: 100%;
  @media (width >= 24rem) {
    max-width: 24rem;
  }
}
</style>
