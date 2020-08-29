<template>
  <div class="grid grid-flow-row grid-flow-col">
    <OrderLister
      v-for="(module, index) in modules"
      :key="index"
      :title="module"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import OrderLister from "@/components/OrderLister.vue";
export default {
  name: "Home",
  components: {
    OrderLister
  },
  computed: {
    modules() {
      return [
        "MASALAR",
        "TELEFON",
        "İNTERNET SİTESİ",
        "YEMEK SEPETİ",
        "AL-GÖTÜR"
      ];
    }
  }
};
</script>
