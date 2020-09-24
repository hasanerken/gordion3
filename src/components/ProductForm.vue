<template>
  <div class="mb-6 md:flex md:items-center">
    <div class="grid w-full grid-cols-5 gap-2 pb-2">
      <input
        class="col-span-4 focus:outline-none focus:bg-white focus:border-myred-400"
        type="text"
        placeholder="Ürün Adı"
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
        class="focus:outline-none focus:bg-white focus:border-myred-400"
        type="text"
        placeholder="Fiyat"
        v-model="prices[item.useKey]"
      />
    </div>
  </div>
  <div class="w-full pt-4"></div>
  <textarea
    class="text-area focus:outline-none focus:bg-white focus:border-myred-400"
    rows="4"
    placeholder="Ürün Tanımı"
    v-model="description"
  />
  <div class="flex flex-row flex-wrap">
    <div
      v-for="(category, catId) in sortObject(categories)"
      :key="catId"
      class="p-1 px-3 m-2 bg-gray-300 rounded-full cursor-pointer"
      @click="runSelectCategory(category.label)"
      :class="
        selectedCategory === category.label
          ? 'bg-blue-800 text-blue-100 ripple'
          : null
      "
    >
      {{ category.label }}
    </div>
  </div>
  <div class="flex flex-row flex-wrap justify-center">
    <div
      v-for="(sub, index) in filteredSubCategories"
      :key="index"
      class="p-1 px-3 m-2 rounded-full cursor-pointer bg-myred-100"
      :class="
        selectedSubCategory === sub.label ? 'bg-myred-600 text-white' : ''
      "
      @click="selectSubCategory(sub.label)"
    >
      {{ sub.label }}
    </div>
  </div>

  <div class="w-full py-3">
    <input
      class="focus:outline-none focus:bg-white focus:border-myred-400"
      type="text"
      placeholder="Ürün Resmi (URL)"
      v-model="imageUrl"
    />
  </div>
  <div class="grid justify-between grid-flow-row grid-cols-2 gap-3 text-md">
    <button class="text-white bg-myred-500" @click="cancelForm">
      KAPAT
    </button>
    <button class="text-white bg-blue-800 " @click="submitForm">
      KAYDET
    </button>
  </div>
</template>

<script>
import { huid } from "@/compositions/useFunctions";
import { reactive, toRefs, ref } from "vue";
import useProducts from "@/compositions/useProducts";
import useCategories from "@/compositions/useCategories";
import useInterfaces from "@/compositions/useInterfaces";
export default {
  props: {
    productId: {
      type: String,
      default: ""
    }
  },
  emits: ["close-modal"],
  setup(props, { emit }) {
    const {
      categories,
      selectCategory,
      filteredSubCategories
    } = useCategories();
    const { activeInterfaces } = useInterfaces();
    const { addProduct, getProduct, getProductsLength } = useProducts();
    const addingScreen = ref(null);
    const product = getProduct(props.productId);
    const productState = reactive({
      label: props.productId ? product.label : "",
      prices: props.productId ? product.prices : {},
      description: props.productId ? product.description : "",
      imageUrl: props.productId ? product.imageUrl : "",
      selectedCategory: props.productId ? product.category : "",
      selectedSubCategory: props.productId ? product.subCategory : "",
      position: props.productId ? product.position : getProductsLength() + 1
    });

    function runSelectCategory(categoryLabel) {
      productState.selectedCategory = categoryLabel;
      selectCategory(categoryLabel);
    }

    function selectSubCategory(subCategoryLabel) {
      productState.selectedSubCategory = subCategoryLabel;
    }

    function submitForm() {
      let payload = {
        label: productState.label,
        prices: productState.prices,
        description: productState.description,
        position: productState.position,
        imageUrl: productState.imageUrl,
        category: productState.selectedCategory,
        subCategory: productState.selectedSubCategory
      };
      if (props.productId === "") {
        addProduct({
          id: huid(8),
          product: payload
        });
      } else {
        addProduct({
          id: props.productId,
          product: payload
        });
      }
      emit("close-modal");
    }

    function cancelForm() {
      emit("close-modal");
    }

    return {
      categories,
      runSelectCategory,
      selectSubCategory,
      filteredSubCategories,
      ...toRefs(productState),
      submitForm,
      activeInterfaces,
      addingScreen,
      cancelForm
    };
  }
};
</script>

<style lang="postcss" scoped>
button {
  @apply w-full p-3 text-lg rounded-sm shadow-lg;
}

input {
  @apply w-full;
}
</style>
