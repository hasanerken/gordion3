<template>
  <div>
    <div class="bg-blue-800 grid grid-cols-5 border-l-2 border-blue-100">
      <span ripple class="col-span-4 bg-blue-800 text-xl p-4 text-gray-200">
        {{ title }}
      </span>
      <button
        ripple
        class="col-span- bg-blue-900 text-gray-100 text-3xl px-1 mr-2"
      >
        +
      </button>
    </div>
    <div class="bg-blue-100 min-h-screen ml-1">
      <Order v-for="n in 6" :key="n" :no="n" class="flex flex-col" />
    </div>
  </div>
</template>

<script>
import Order from "@/components/Order.vue";
export default {
  components: {
    Order
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },

  setup() {
    return {};
  }
};
</script>

<style scoped></style>
