<template>
  <AlertModal
    :title="alert.title"
    :message="alert.message"
    :variant="alert.variant"
    :show-modal="alert.alertModal"
    @update:showModal="alert.alertModal = $event"
  />
  <section class="container mx-auto p-4 bg-neutral-100 rounded-2xl shadow-lg">
    <div class="flex flex-col gap-4 md:flex-row justify-between items-center">
      <h1 class="text-3xl font-semibold text-neutral-900">Lista de Tareas</h1>
      <div class="flex gap-4">
        <FilterOrderButton @filter="filterTasks" />
        <AddEditTask :refresh-function="getTasks" />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <CardTask
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        :refresh-function="getTasks"
      />
    </div>
    <div v-if="filteredTasks.length === 0" class="text-center m-8">
      <p class="text-lg font-semibold text-neutral-900">No hay tareas</p>
      <p class="text-md font-semibold text-neutral-700">¡Prueba agregando unas!</p>
    </div>
  </section>
</template>

<script>
import AddEditTask from './components/AddEditTask.vue'
import CardTask from './components/CardTask.vue'
import TaskService from './service/TaskService'
import AlertModal from './components/AlertModal.vue'
import FilterOrderButton from './components/FilterOrderButton.vue'

export default {
  name: 'App',
  components: {
    AddEditTask,
    CardTask,
    AlertModal,
    FilterOrderButton,
  },
  data() {
    return {
      tasks: [],
      filteredTasks: [],
      TaskService: new TaskService(),
      alert: {
        title: '',
        message: '',
        variant: 'add',
        alertModal: false,
      },
    }
  },
  methods: {
    async getTasks() {
      try {
        this.tasks = await this.TaskService.getTasks()
        this.filteredTasks = this.tasks
      } catch (error) {
        this.alert = {
          title: 'Oops! Ocurrió un error',
          message: 'Ocurrió un error al cargar las tareas: ' + error,
          variant: 'error',
          alertModal: true,
        }
      }
    },
    filterTasks(state) {
      console.log(state)
      this.filteredTasks = this.tasks.filter((task) => task.state_type.name === state)
      if (state === 'all') {
        this.filteredTasks = this.tasks
      }
    },
  },
  created() {
    this.getTasks()
  },
}
</script>
