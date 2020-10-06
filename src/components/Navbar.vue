<template>
  <div class="flex w-screen">
    <div
      v-for="(link, index) in links"
      :key="index"
      class="navbar ripple"
      :class="isActive(link.path) ? 'bg-blue-400' : 'bg-blue-800'"
    >
      <router-link :to="link.path" class="router">
        {{ link.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const links = [
      { path: "/", text: "Siparişler" },
      { path: "/products", text: "Ürünler" },
      { path: "/menus", text: "Menüler" },
      { path: "/reports", text: "Raporlar" }
    ];
    const router = useRouter();
    const activeRoute = computed(() => router.currentRoute.value.path);
    const isActive = path => path === activeRoute.value;
    return { isActive, links };
  }
};
</script>

<style lang="postcss" scoped>
.navbar {
  @apply text-2xl h-12 shadow-innerlg w-screen;
}
.router {
  @apply flex items-center justify-center h-12 text-white;
}
</style>
