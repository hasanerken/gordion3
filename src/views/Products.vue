<template>
  <div>
    
  </div>
</template>

<script>
import Vuex from "vuex";
export default {
  data() {
    return {};
  },
  setup() {
    return {};
  },
  computed: {
    ...Vuex.mapGetters("productStore", ["doubleCount"])
  },
  methods: {
    // turkishLira(value) {
    //   return new Intl.NumberFormat("tr-TR", {
    //     style: "currency",
    //     currency: "TRY"
    //   }).format(value);
    // }
  }
};
</script>

<style scoped></style>
