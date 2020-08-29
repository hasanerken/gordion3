<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />

      <div class="modal__dialog">
        <div class="flex items-center justify-between px-6 text-xl">
          <slot name="header" />
          <button
            type="button"
            class="text-4xl font-bold"
            @click="closeModal()"
          >
            &times;
          </button>
        </div>

        <div class="modal__body">
          <slot name="body" />
        </div>

        <div class="p-2">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
}
.modal__backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}
.modal__dialog {
  position: relative;
  width: 600px;
  background-color: #fff;
  border-radius: 5px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  z-index: 2;
}
@media screen and (max-width: 992px) {
  .modal__dialog {
    width: 90%;
  }
}

.modal__body {
  padding: 10px 20px 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
