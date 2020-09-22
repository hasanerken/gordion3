<template>
  <div class="h-screen bg-mygray-100">
    <ProductCategories
      @sub-selected="filterProducts"
      @category-selected="filterProducts"
    />
    <div class="grid justify-center grid-cols-2 gap-2 mb-12">
      <div v-for="(product, key) in sortObject(filteredProducts)" :key="key">
        <div class="flex flex-col m-2 divide-y bg-myred-100 divide-mypink-400">
          <div
            class="flex flex-row items-center justify-between p-2 text-2xl text-white bg-myred-500"
          >
            <div class="px-3 cursor-pointer" @click="openEditProduct(key)">
              {{ product.label }}
            </div>
            <div
              @click="deleteProduct(key)"
              class="flex items-center justify-center w-10 h-10 px-3 rounded-full cursor-pointer hover:bg-myred-400"
            >
              &times;
            </div>
          </div>
          <PriceBanner :prices="product.prices" />
          <div class="flex flex-row items-center p-1 text-sm text-left">
            <div v-if="product.imageUrl" id="image">
              <img
                :src="product.imageUrl"
                :alt="product.label"
                class="object-cover w-48"
              />
            </div>
            <div
              v-if="product.description"
              id="description"
              class="flex items-center p-2 w-52"
            >
              {{ product.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <RoundedButton @run-add-screen="openAddProduct" />

    <!-- PRODUCT FORM -->
    <modal ref="addingScreen" :title="'Ürün Ekle'">
      <template v-slot:body>
        <ProductForm :product-id="sharedKey" @close-modal="closeModal" />
      </template>
    </modal>
  </div>
</template>

<script>
import PriceBanner from "@/components/PriceBanner";
import RoundedButton from "@/components/RoundedButton";
import ProductForm from "@/components/ProductForm";
import ProductCategories from "@/components/ProductCategories";
import useProducts from "@/compositions/useProducts";
import { ref, computed } from "vue";
export default {
  components: {
    PriceBanner,
    RoundedButton,
    ProductCategories,
    ProductForm
  },
  setup() {
    const { products, deleteProduct } = useProducts();
    const addingScreen = ref(null);
    const sharedKey = ref(null);
    const sharedFilter = ref(null);

    const filteredProducts = computed(() => {
      let filteredItems = {};

      Object.keys(products).forEach(item => {
        if (sharedFilter.value !== null) {
          if (
            products[item].subCategory === sharedFilter.value ||
            products[item].category === sharedFilter.value
          ) {
            filteredItems[item] = products[item];
          }
        } else {
          filteredItems = products;
        }
      });

      return filteredItems;
    });

    function openAddProduct() {
      sharedKey.value = "new";
      addingScreen.value.openModal();
    }

    function openEditProduct(key) {
      sharedKey.value = key;
      addingScreen.value.openModal();
    }
    function closeModal() {
      addingScreen.value.closeModal();
    }
    function filterProducts(selectedSubOrCategory) {
      sharedFilter.value = selectedSubOrCategory;
      console.log(sharedFilter.value);
    }
    return {
      filteredProducts,
      openAddProduct,
      openEditProduct,
      deleteProduct,
      filterProducts,
      addingScreen,
      closeModal,
      sharedKey
    };
  }
};
</script>

<style lang="postcss" scoped>
button {
  @apply w-full p-3 text-lg rounded-sm shadow-lg;
}
input {
  @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight;
}
.text-area {
  @apply w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none;
}
.text-area:focus {
  --border-opacity: 1;
  border-color: #f15b8a;
  border-color: rgba(241, 91, 138, var(--border-opacity));
}
.text-area:focus {
  --bg-opacity: 1;
  background-color: #fff;
  background-color: rgba(255, 255, 255, var(--bg-opacity));
}
.textarea {
  width: 250px;
  min-height: 50px;
  overflow: hidden;
  height: auto;
}
</style>
