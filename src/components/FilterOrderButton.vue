<template>
  <button
    @click="toggleMenu"
    class="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md cursor-pointer text-md font-light bg-gray-500 text-white hover:bg-gray-600"
  >
    <span class="material-symbols-outlined"> filter_alt </span>
    filtrar
  </button>
  <div
    v-if="menuVisible"
    class="absolute mt-12 w-32 rounded-md shadow-lg bg-gray-300 z-10 border border-neutral-400"
  >
    <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <button
        class="block w-full text-left px-4 py-2 text-md hover:bg-gray-400"
        role="menuitem"
        @click="changefilter('Completed')"
      >
        Completado
      </button>
      <button
        class="block w-full text-left px-4 py-2 text-md hover:bg-gray-400"
        role="menuitem"
        @click="changefilter('In Progress')"
      >
        En Progreso
      </button>
      <button
        class="block w-full text-left px-4 py-2 text-md hover:bg-gray-400"
        role="menuitem"
        @click="changefilter('Cancelled')"
      >
        Cancelado
      </button>
      <button
        class="block w-full text-left px-4 py-2 text-md hover:bg-gray-400"
        role="menuitem"
        @click="changefilter('all')"
      >
        Limpiar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterOrderButton',
  emits: ['filter'],
  data() {
    return {
      menuVisible: false,
    }
  },
  methods: {
    changefilter(state) {
      this.$emit('filter', state)
      this.menuVisible = false
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
  },
}
</script>

<style scoped></style>
