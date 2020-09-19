<template>
  <div class="grid grid-flow-col">
    <PhoneOrders />
    <YemekSepetiOrders />
  </div>
</template>

<script>
// @ is an alias to /src
import PhoneOrders from "@/components/PhoneOrders.vue";
import YemekSepetiOrders from "@/components/YemekSepetiOrders.vue";

export default {
  name: "Home",
  components: {
    PhoneOrders,
    YemekSepetiOrders
  }
};
</script>
<style></style>
