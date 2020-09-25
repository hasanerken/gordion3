<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()" />

      <div
        class="mt-24 modal__dialog"
        :class="position === 'second' ? 'modal__second_dialog' : ''"
      >
        <div
          class="flex items-center justify-between px-6 text-xl text-white bg-myred-500"
        >
          <div name="header">{{ title.toLocaleUpperCase("TR") }}</div>
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
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    position: {
      type: String,
      default: "first"
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false
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
    }
  }
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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.modal__dialog {
  position: relative;
  width: 50%;
  margin: 30px auto;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.modal__second_dialog {
  margin: 200px auto;
  width: 60%;
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
