<template>
  <form @submit.prevent class="w-full ">
    <div class="mb-6 md:flex md:items-center">
      <div class="w-full">
        <input
          class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-myred-400"
          type="text"
          placeholder="Menü Adı"
          v-model="label"
        />
      </div>
    </div>
    <div class="flex flex-row items-center">
      <div v-for="(item, key) in activeInterfaces" :key="key" class="m-1">
        <div>{{ item.label }}</div>
        <input
          class="w-full px-4 py-2 m-1 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-myred-400"
          type="text"
          placeholder="Fiyat"
          v-model="prices[item.useKey]"
        />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="(category, categoryKey) in sortObject(categories)"
        :key="categoryKey"
        class=""
      >
        <button
          class="w-full h-12 my-3 text-white bg-blue-800"
          @click="
            openProductSelector({ index: categoryKey, label: category.label })
          "
        >
          {{ category.label }} EKLE
        </button>
        <div v-if="content[categoryKey]" class="flex flex-row flex-wrap">
          <div
            v-for="(item, idx) in content[categoryKey].ids"
            :key="idx"
            class="p-2 mx-2 my-1 bg-gray-200 rounded-md"
            @click="
              removeProductFromMenu({
                idx: idx,
                productKey: item,
                categoryKey: categoryKey
              })
            "
          >
            {{ getProduct(item).label }}
          </div>
        </div>
      </div>
    </div>
  </form>
  <div class="grid justify-between grid-flow-row grid-cols-2 gap-3 text-md">
    <button class="text-white bg-myred-500">
      SİL
    </button>
    <button class="text-white bg-blue-800 " @click="submitForm">
      KAYDET
    </button>
  </div>

  <!-- MENÜ İÇERİSİNE YEMEK, İÇECEK VB. EKLEMELERİN YAPILDIĞI MODAL -->
  <modal ref="productSelector" :position="'second'">
    <template v-slot:header> EKLENECEK ÜRÜNÜ SEÇİN </template>
    <template v-slot:body class="bg-blue-300">
      <div
        id="fullText"
        class="grid w-full h-full grid-cols-2 gap-2 rounded-b-lg"
      >
        <div
          v-for="(product, index) in getProductsByCategory(
            selectedCategoryLabel
          )"
          :key="index"
          class=""
        >
          <div
            class="flex items-center justify-center w-full h-16 p-4 text-2xl bg-gray-400 rounded-md shadow-md cursor-pointer ripple "
            @click="addProductToMenu({ id: index, value: product.label })"
          >
            {{ product.label }}
          </div>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import useCategories from "@/compositions/useCategories";
import useInterfaces from "@/compositions/useInterfaces";
import useProducts from "@/compositions/useProducts";
import { sortObject } from "@/compositions/useFunctions";
export default {
  emits: ["close-modal"],
  setup(props, { emit }) {
    const { categories } = useCategories();
    const { activeInterfaces } = useInterfaces();
    const { getProductsByCategory, getProduct } = useProducts();
    const menuState = reactive({
      label: "",
      prices: {},
      content: {},
      selectedCategoryKey: "",
      selectedCategoryLabel: ""
    });
    Object.keys(sortObject(categories)).forEach((item) => {
      menuState.content[item] = {};
      menuState.content[item].ids = [];
    });
    const productSelector = ref(false);

    function openProductSelector() {
      // this.selectedCategoryLabel = menu.label;
      // this.selectedCategoryKey = menu.index;
      productSelector.value.openModal();
    }

    function addProductToMenu(item) {
      if (
        !menuState.content[menuState.selectedCategoryKey].ids.includes(item.id)
      ) {
        menuState.content[menuState.selectedCategoryKey].ids.push(item.id);
      }
    }

    function removeProductFromMenu(payload) {
      console.log(payload);
      menuState.content[payload.categoryKey].ids.splice(payload.idx, 1);
    }

    function submitForm() {
      let payload = {
        label: menuState.label,
        content: menuState.content,
        prices: menuState.prices
      };
      console.log("submitform", payload);
      // if (this.sharedKey === "new") {
      //   let uid = this.huid(8);
      //   this.addMenu({ id: uid, menu: payload });
      // } else {
      //   this.editMenu({ id: this.sharedKey, updates: payload });
      // }
      emit("close-modal");
    }

    return {
      ...toRefs(menuState),
      activeInterfaces,
      sortObject,
      categories,
      openProductSelector,
      productSelector,
      getProductsByCategory,
      getProduct,
      addProductToMenu,
      removeProductFromMenu,
      submitForm
    };
  }
};
</script>

<style lang="postcss" scoped>
button {
  @apply w-full p-3 text-lg rounded-sm shadow-lg;
}
</style>
