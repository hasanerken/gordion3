<template>
  <div id="prices" class="flex flex-row justify-around p-2">
    <div class="grid grid-col-2" v-for="(price, index) in prices" :key="index">
      <div>{{ getInterfaceLabel(index).label }}</div>
      <div>{{ turkishLira(price) }}</div>
    </div>
  </div>
</template>

<script>
import Vuex from "vuex";
export default {
  props: {
    prices: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
      ...Vuex.mapGetters(['getInterfaceLabel'])
  }
};
</script>

<style lang="scss" scoped></style>
