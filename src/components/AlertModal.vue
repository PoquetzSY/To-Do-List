<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" v-if="showModal">
    <div
      class="containerAlert bg-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-4 relative"
    >
      <h2 class="text-2xl font-semibold text-center">{{ title }}</h2>
      <img :src="`/assets/img/gatito-${variant}.png`" alt="gatito icono" />
      <p class="text-center">{{ message }}</p>
      <div class="flex justify-center">
        <button
          @click="handleModal"
          class="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg mr-2"
        >
          Cerrar
        </button>
      </div>
      <div class="progress-bar rounded-b-lg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertModal',
  props: {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'add',
      validator: (value) => ['add', 'edit', 'delete', 'error', 'complete'].includes(value),
    },
    showModal: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    showModal(newVal) {
      if (newVal) {
        this.startTimer()
      }
    },
  },
  methods: {
    handleModal() {
      this.$emit('update:showModal', false)
    },
    startTimer() {
      setTimeout(() => {
        this.handleModal()
      }, 5000)
    },
  },
}
</script>

<style scoped>
.containerAlert {
  margin: 2rem;
  width: 100%;
  @media (width >= 24rem) {
    max-width: 24rem;
  }
  @media (width >= 32rem) {
    max-width: 32rem;
  }
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(
    90deg,
    #003f5c,
    #2f4b7c,
    #665191,
    #a05195,
    #d45087,
    #f95d6a,
    #ff7c43,
    #ffa600
  );
  animation: progress 5s linear forwards;
}

@keyframes progress {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
