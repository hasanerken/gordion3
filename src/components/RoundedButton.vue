<template>
  <div class="outer-div ">
    <button class="inner-div" @click="runButton">
      +
    </button>
  </div>
</template>

<script>
export default {
  props: {
    pageOrigin: {
      type: String,
      default: ""
    }
  },
  methods: {
    runButton() {
      console.log("run button run");
      this.$emit("run-add-screen");
    }
  }
};
</script>

<style lang="postcss" scoped>
.outer-div {
  @apply fixed bottom-0 mb-16 flex flex-row w-full justify-center;
}
.inner-div {
  @apply h-24 w-24 rounded-full bg-blue-800 flex items-center justify-center text-6xl text-white shadow-xl cursor-pointer;
}
</style>
