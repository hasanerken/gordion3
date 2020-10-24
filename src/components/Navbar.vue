<template>
  <div
    class="flex flex-row items-center w-screen p-0 m-0 bg-blue-500 sm:w-24 sm:h-screen sm:flex-col"
  >
    <img src="../assets/svgs/top.svg" alt="" class="hidden h-16 sm:block" />
    <ul
      v-for="(link, index) in links"
      :key="index"
      class="w-full ripple"
      :class="isActive(link.path) ? 'bg-blue-900' : 'bg-blue-500'"
    >
      <li class="grid items-center h-24 grid-cols-1">
        <router-link :to="link.path" class="router">
          <div class="flex flex-col justify-center w-full">
            {{ link.text }}
            <img :src="link.icon" alt="" class="h-12" />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const links = [
      {
        path: "/",
        text: "Siparişler",
        icon: require("../assets/svgs/orders.svg")
      },
      {
        path: "/products",
        text: "Ürünler",
        icon: require("../assets/svgs/products.svg")
      },
      {
        path: "/menus",
        text: "Menüler",
        icon: require("../assets/svgs/menus.svg")
      },
      {
        path: "/reports",
        text: "Raporlar",
        icon: require("../assets/svgs/reports.svg")
      }
    ];
    const router = useRouter();
    const activeRoute = computed(() => router.currentRoute.value.path);
    const isActive = (path) => path === activeRoute.value;
    return { isActive, links };
  }
};
</script>

<style lang="postcss" scoped>
.navbar {
  @apply text-2xl;
}
.router {
  @apply flex items-center justify-center h-12 text-white;
}
</style>
