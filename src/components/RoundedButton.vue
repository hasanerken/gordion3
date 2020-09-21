<template>
  <div class="outer-div ">
    <button class="bg-blue-800 inner-div hover:bg-blue-500" @click="runButton">
      +
    </button>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    function runButton() {
      emit("run-add-screen");
    }
    return { runButton };
  }
};
</script>

<style lang="postcss" scoped>
.outer-div {
  @apply fixed bottom-0 flex flex-row mb-30 z-10 w-full justify-center bg-red-200 h-0;
}
.inner-div {
  @apply h-24 w-24 rounded-full flex items-center justify-center text-6xl text-white shadow-2xl cursor-pointer;
}
</style>
