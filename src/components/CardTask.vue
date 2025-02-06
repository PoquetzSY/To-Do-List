<template>
  <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col min-h-[200px] gap-5">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold text-neutral-900">{{ task.title }}</h2>
      <DeleteTask :task="task" :refresh-function="refreshFunction" />
    </div>
    <p class="text-sm text-neutral-700 flex-1 line-clamp-3">
      {{ task.description }}
    </p>
    <div class="flex justify-between items-center">
      <StatePill
        :state="task.state_type.name"
        :task-id="task.id"
        :refresh-function="refreshFunction"
      />
      <AddEditTask :task="task" :is-editing="true" :refresh-function="refreshFunction" />
    </div>
  </div>
</template>

<script>
import AddEditTask from './AddEditTask.vue'
import DeleteTask from './deleteTask.vue'
import StatePill from './StatePill.vue'

export default {
  name: 'CardTask',
  components: {
    AddEditTask,
    StatePill,
    DeleteTask,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    refreshFunction: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
