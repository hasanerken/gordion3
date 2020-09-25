<template>
  <form @submit.prevent class="w-full ">
    <div class="mb-6 md:flex md:items-center">
      <div class="grid w-full grid-cols-5 gap-2 pb-2">
        <input
          class="col-span-4 focus:outline-none focus:bg-white focus:border-myred-400"
          type="text"
          placeholder="Menü Adı"
          v-model="label"
        />
        <input
          class="focus:outline-none focus:bg-white focus:border-myred-400"
          type="number"
          placeholder="Ürün Sırası"
          v-model="position"
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
            openProductSelector({
              categoryKey: categoryKey,
              categoryLabel: category.label
            })
          "
        >
          <span> {{ category.label }} EKLE</span>
          <span class="px-3 py-1 ml-5 bg-blue-700 rounded-full">{{
            content[categoryKey].quantity
          }}</span>
        </button>
        <div v-if="content[categoryKey]" class="flex flex-row flex-wrap">
          <div
            v-for="(item, idx) in content[categoryKey].ids"
            :key="idx"
            class="p-2 mx-2 my-1 bg-gray-200 rounded-md cursor-pointer"
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
    <button class="text-white bg-myred-500" @click="$emit('close-modal')">
      İPTAL
    </button>
    <button class="text-white bg-blue-800 " @click="submitForm">
      KAYDET
    </button>
  </div>

  <!-- MENÜ İÇERİSİNE YEMEK, İÇECEK VB. EKLEMELERİN YAPILDIĞI MODAL -->
  <modal ref="productSelector" :position="'second'" :title="'Ürün Ekle'">
    <template v-slot:header> EKLENECEK ÜRÜNÜ SEÇİN </template>
    <template v-slot:body class="bg-blue-300">
      <div
        id="fullText"
        class="grid w-full h-full grid-cols-2 gap-2 rounded-b-lg"
      >
        <div class="flex justify-center col-span-2">
          <div class="flex items-center justify-center">
            <div class="mr-4 text-xl font-bold text-blue-800">
              MENÜYE EKLENECEK ÜRÜN ADEDİ:
            </div>
            <div
              class="flex justify-center text-xl bg-blue-900 rounded-l-full cursor-pointer"
              @click="decreaseQuantity"
            >
              <svg
                class="w-12 h-12 p-2"
                fill="#FEFEFE"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm5-11H5v2h10V9z"
                />
              </svg>
            </div>
            <div
              class="flex items-center justify-center w-24 h-12 text-2xl font-bold text-gray-100 bg-blue-900"
            >
              {{ content[selectedCategoryKey].quantity }}
            </div>
            <div
              class="flex justify-center text-xl bg-blue-900 rounded-r-full cursor-pointer"
              @click="increaseQuantity"
            >
              <svg
                class="w-12 h-12 p-2"
                fill="#FEFEFE"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          class="w-full col-span-2 mt-4 mr-6 text-xl font-bold text-blue-800"
        >
          MENÜYE EKLENECEK ÜRÜNLER
        </div>
        <div v-for="(product, index) in filteredProducts" :key="index" class="">
          <div
            class="flex items-center justify-center w-full h-16 p-4 text-2xl bg-gray-400 rounded-md shadow-md cursor-pointer ripple "
            @click="addProductToMenu({ id: index, value: product.label })"
          >
            {{ product.label }}
          </div>
        </div>
      </div>
      <div
        class="grid justify-between grid-flow-row grid-cols-2 gap-3 mt-4 text-md"
      >
        <button class="text-white bg-myred-500" @click="clearContent">
          SİL
        </button>
        <button
          class="text-white bg-blue-800 "
          @click="productSelector.closeModal()"
        >
          KAYDET
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from "vue";
import useCategories from "@/compositions/useCategories";
import useInterfaces from "@/compositions/useInterfaces";
import useProducts from "@/compositions/useProducts";
import useMenus from "@/compositions/useMenus";
import { sortObject } from "@/compositions/useFunctions";
export default {
  emits: ["close-modal"],
  props: {
    menuId: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const { categories } = useCategories();
    const { activeInterfaces } = useInterfaces();
    const { addMenu, getMenu, getMenusLength } = useMenus();
    const {
      getProductsByCategory,
      getProduct,
      filterProducts,
      filteredProducts
    } = useProducts();

    const menuState = reactive({
      label: props.menuId ? getMenu(props.menuId).label : "",
      position: props.menuId
        ? getMenu(props.menuId).position
        : getMenusLength() + 1,
      prices: props.menuId ? getMenu(props.menuId).prices : {},
      content: {},
      selectedCategoryKey: "",
      selectedCategoryLabel: ""
    });

    Object.keys(sortObject(categories)).forEach(item => {
      menuState.content[item] = {};
      menuState.content[item].ids = [];
      menuState.content[item].quantity = 0;
    });

    onMounted(() => {
      if (props.menuId) {
        menuState.content = getMenu(props.menuId).content;
      }
    });

    const productSelector = ref(false);

    function openProductSelector(payload) {
      filterProducts(payload.categoryLabel);
      menuState.selectedCategoryKey = payload.categoryKey;

      productSelector.value.openModal();
    }

    function addProductToMenu(item) {
      if (
        !menuState.content[menuState.selectedCategoryKey].ids.includes(item.id)
      ) {
        menuState.content[menuState.selectedCategoryKey].ids.push(item.id);
      }
      if (menuState.content[menuState.selectedCategoryKey].quantity === 0)
        increaseQuantity();
    }

    function increaseQuantity() {
      menuState.content[menuState.selectedCategoryKey].quantity++;
    }
    function decreaseQuantity() {
      menuState.content[menuState.selectedCategoryKey].quantity--;
    }

    function removeProductFromMenu(payload) {
      menuState.content[payload.categoryKey].ids.splice(payload.idx, 1);

      if (menuState.content[payload.categoryKey].ids.length === 0) {
        menuState.content[menuState.selectedCategoryKey].quantity = 0;
      }
    }
    function clearContent() {
      menuState.content[menuState.selectedCategoryKey].quantity = 0;
      menuState.content[menuState.selectedCategoryKey].ids = [];
      productSelector.value.closeModal();
    }

    function submitForm() {
      let payload = {
        label: menuState.label,
        position: menuState.position,
        content: menuState.content,
        prices: menuState.prices
      };
      if (props.menuId) {
        addMenu({ id: props.menuId, menu: payload });
      } else {
        let uid = this.huid(8);
        addMenu({ id: uid, menu: payload });
      }
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
      filteredProducts,
      increaseQuantity,
      decreaseQuantity,
      clearContent,
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
