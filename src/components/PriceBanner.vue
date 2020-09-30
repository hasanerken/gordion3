<template>
  <div id="prices" class="flex flex-row justify-around p-2">
    <div class="grid grid-col-2" v-for="(price, index) in prices" :key="index">
      <div class="text-xs font-bold">{{ getLabel(index) }}</div>
      <div>{{ turkishLira(price) }}</div>
    </div>
  </div>
</template>

<script>
import useInterfaces from "@/compositions/useInterfaces";
export default {
  props: {
    prices: {
      type: Object,
      default: () => {}
    }
  },
  setup() {
    const { activeInterfaces, interfaces } = useInterfaces();

    function getLabel(index) {
      return interfaces[index].label;
    }

    return { activeInterfaces, interfaces, getLabel };
  }
};
</script>

<style lang="scss" scoped></style>
