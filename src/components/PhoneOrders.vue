<template>
  <div>
    <div
      class="flex flex-row items-center justify-center h-16 text-2xl text-white bg-blue-800 border-l-2 border-blue-100 cursor-pointer ripple"
    >
      <div class="w-full">
        TELEFON SİPARİŞLERİ
      </div>
      <div
        class="flex items-center justify-center w-10 h-10 p-3 m-2 font-bold text-blue-900 bg-blue-100 rounded-full"
      >
        +
      </div>
    </div>

    <div class="min-h-screen p-2 m-4">
      <Order v-for="n in 6" :key="n" class="flex flex-col" />
    </div>
  </div>
</template>

<script>
import Order from "@/components/Order.vue";
export default {
  components: {
    Order
  },
  setup() {
    return {};
  }
};
</script>

<style scoped></style>
