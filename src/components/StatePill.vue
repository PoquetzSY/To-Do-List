<template>
  <AlertModal
    :title="alert.title"
    :message="alert.message"
    :variant="alert.variant"
    :show-modal="alert.alertModal"
    @update:showModal="alert.alertModal = $event"
  />
  <div class="relative inline-block select-none" ref="menuContainer">
    <span
      :class="[
        'px-2 py-1 text-xs font-semibold text-white rounded-full cursor-pointer flex items-center truncate',
        stateClass,
      ]"
      @click="toggleMenu"
    >
      {{ SpanishStates }}
      <span class="material-symbols-outlined"> keyboard_arrow_down </span>
    </span>
    <div
      v-if="menuVisible"
      class="absolute mt-2 w-32 rounded-md shadow-lg bg-gray-300 z-10 border border-neutral-400"
    >
      <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <button
          :class="[
            'block w-full text-left px-4 py-2 text-md',
            {
              'text-emerald-600': state === 'Completed',
              'hover:text-emerald-600': state !== 'Completed',
            },
          ]"
          role="menuitem"
          @click="changeStateValue(2)"
        >
          Completado
        </button>
        <button
          :class="[
            'block w-full text-left px-4 py-2 text-md',
            {
              'text-indigo-600': state === 'In Progress',
              'hover:text-indigo-600': state !== 'In Progress',
            },
          ]"
          role="menuitem"
          @click="changeStateValue(3)"
        >
          En Progreso
        </button>

        <button
          :class="[
            'block w-full text-left px-4 py-2 text-md',
            {
              'text-red-600': state === 'Cancelled',
              'hover:text-red-600': state !== 'Cancelled',
            },
          ]"
          role="menuitem"
          @click="changeStateValue(1)"
        >
          Cancelado
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from '@/service/TaskService'
import AlertModal from './AlertModal.vue'

export default {
  name: 'StatePill',
  components: {
    AlertModal,
  },
  props: {
    state: {
      type: String,
      required: true,
      validator: (value) => ['Completed', 'In Progress', 'Cancelled'].includes(value),
    },
    taskId: {
      type: Number,
      required: true,
    },
    refreshFunction: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      menuVisible: false,
      TaskService: new TaskService(),
      alert: {
        title: '',
        message: '',
        variant: 'add',
        alertModal: false,
      },
    }
  },
  computed: {
    stateClass() {
      return {
        'bg-red-600': this.state === 'Cancelled',
        'bg-indigo-600': this.state === 'In Progress',
        'bg-emerald-600': this.state === 'Completed',
      }
    },
    SpanishStates() {
      return this.state === 'Completed'
        ? 'Completado'
        : this.state === 'In Progress'
          ? 'En Progreso'
          : 'Cancelado'
    },
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
    changeState(newState) {
      this.$emit('update:state', newState)
      this.menuVisible = false
    },
    closeMenu(event) {
      if (
        this.menuVisible &&
        this.$refs.menuContainer &&
        !this.$refs.menuContainer.contains(event.target)
      ) {
        this.menuVisible = false
      }
    },

    async changeStateValue(newState) {
      try {
        await this.TaskService.changeStateTask(newState, this.taskId)
        this.toggleMenu()
        if (newState === 2) {
          this.alert = {
            title: 'Tarea Completada',
            message: 'Una tarea más completada, ¡buen trabajo!',
            variant: 'complete',
            alertModal: true,
          }
        } else if (newState === 1) {
          this.alert = {
            title: 'Tarea Cancelada',
            message: 'No más trabajo por hoy, esta tarea ha sido cancelada',
            variant: 'delete',
            alertModal: true,
          }
        } else if (newState === 3) {
          this.alert = {
            title: 'Tarea en Progreso',
            message: '¿Otra vez esta tarea?, no me gusta repetir mi trabajo',
            variant: 'edit',
            alertModal: true,
          }
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
  mounted() {
    document.addEventListener('click', this.closeMenu)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenu)
  },
}
</script>

<style scoped></style>
