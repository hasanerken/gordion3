<template>
  <div>
    <div
      class="flex flex-row items-center justify-center h-16 text-2xl text-white bg-blue-800 border-l-2 border-blue-100 cursor-pointer ripple"
    >
      <div class="w-full">
        YEMEK SEPETİ
      </div>
      <div
        class="flex items-center justify-center w-10 h-10 p-3 m-2 font-bold text-blue-900 bg-blue-100 rounded-full"
      >
        +
      </div>
    </div>

    <div class="min-h-screen p-2 m-4"></div>
  </div>
</template>

<script>
// import Order from "@/components/Order.vue";
export default {
  components: {
    //Order
  },
  setup() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped>
/* .container {
  flex-basis: 45%;
  max-height: 100vh;
  overflow-y: scroll;
}
.container.proximity {
  -ms-scroll-snap-type: y proximity;
  scroll-snap-type: y proximity;
} */
</style>
