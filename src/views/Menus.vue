<template>
  <main>
    <div
      class="flex flex-row items-center justify-center w-full h-12 mb-4 text-2xl text-white bg-blue-800"
    >
      MENÜLER
    </div>
    <div class="grid justify-center grid-cols-1 gap-2 m-2 md:grid-cols-2 ">
      <div
        v-for="(menu, key) in sortObject(menus)"
        :key="key"
        class="bg-pink-100 "
      >
        <div class="divide-y bg-myred-100 divide-mypink-400">
          <div
            class="flex justify-between p-2 text-2xl text-white bg-myred-500 "
          >
            <div class="px-3 cursor-pointer" @click="openMenuScreen(key)">
              {{ menu.label }}
            </div>
            <div
              @click="deleteMenu(key)"
              class="flex items-center justify-center w-10 h-10 px-3 rounded-full cursor-pointer hover:bg-myred-400"
            >
              &times;
            </div>
          </div>
          <PriceBanner :prices="menu.prices" />
          <div class="p-2">
            <div
              v-for="(content, index) in menu.content"
              :key="index"
              class="grid grid-cols-12"
            >
              <div v-if="content.ids.length > 0" class="col-span-3 text-left">
                {{ getCategoryLabel(index) }} ( {{ content.quantity }}) :
              </div>
              <div class="flex flex-row flex-wrap col-span-9">
                <span
                  v-for="(item, index) in content.ids"
                  :key="index"
                  class="flex flex-row rounded-sm"
                >
                  <span class="mx-1"> &bull;{{ getProduct(item).label }} </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PriceBanner />
    <RoundedButton @run-add-screen="openMenuScreen" />

    <!-- BU MODAL YENİ MENÜLERİN OLUŞTURULDUĞU KISIMDIR. -->
    <modal ref="menuScreen" :title="'Menü Ekle'">
      <template v-slot:body>
        <MenuForm :menu-id="sharedMenuId" @close-modal="closeModal" />
      </template>
    </modal>
  </main>
</template>

<script>
import PriceBanner from "@/components/PriceBanner";
import RoundedButton from "@/components/RoundedButton";
import MenuForm from "@/components/MenuForm";
import { ref } from "vue";
import useMenus from "@/compositions/useMenus";
import useProducts from "@/compositions/useProducts";
import useCategories from "@/compositions/useCategories";
export default {
  setup() {
    const { menus, deleteMenu } = useMenus();
    const { getProduct, filteredProducts } = useProducts();
    const { categories, subCategories } = useCategories();
    const menuScreen = ref(false);
    const sharedMenuId = ref(null);

    function openMenuScreen(menuId) {
      console.log("1", menuId);
      menuScreen.value.openModal();

      if (menuId) {
        sharedMenuId.value = menuId;
      } else {
        sharedMenuId.value = "";
      }
    }

    function getCategoryLabel(useKey) {
      console.log(useKey);
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
          .filter(key => predicate(obj[key]))
          .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

      let item = Object.filter(
        categories,
        category => category.useKey === useKey
      );
      console.log(item);
      return Object.values(item)[0].label;
    }

    function closeModal() {
      menuScreen.value.closeModal();
    }
    return {
      menus,
      categories,
      subCategories,
      getProduct,
      openMenuScreen,
      filteredProducts,
      getCategoryLabel,
      sharedMenuId,
      deleteMenu,
      closeModal,
      menuScreen
    };
  },
  components: {
    PriceBanner,
    RoundedButton,
    MenuForm
  }
};
</script>

<style lang="postcss" scoped>
button {
  @apply w-full p-3 text-lg rounded-sm shadow-lg;
}
</style>
