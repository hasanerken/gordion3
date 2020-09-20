<template>
  <div>
    <div
      v-for="(link, index) in links"
      :key="index"
      class="h-12 "
      :class="isActive(link.path) ? 'bg-myred-500' : 'bg-blue-800'"
    >
      <router-link
        :to="link.path"
        class="flex items-center justify-center w-full h-12 text-white"
      >
        {{ link.text }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const links = [
      { path: "/", text: "Ana Sayfa" },
      { path: "/products", text: "Ürünler" }
    ];
    const router = useRouter();
    const activeRoute = computed(() => router.currentRoute.value.path);
    const isActive = path => path === activeRoute.value;
    return { isActive, links };
  }
};
</script>

<style lang="postcss" scoped>
div {
  @apply w-screen flex items-center justify-around text-2xl;
}
</style>
