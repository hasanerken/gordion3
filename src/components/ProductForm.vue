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
    class="bg-red-600 text-area focus:outline-none focus:bg-white focus:border-myred-400"
    rows="4"
    placeholder="Ürün Tanımı"
    v-model="description"
  />
  <div class="flex flex-row flex-wrap">
    <div
      v-for="(category, catId) in sortObject(categories)"
      :key="catId"
      class="p-1 px-3 m-2 bg-gray-300 rounded-full"
      @click="selectedCategory = category.label"
      :class="
        selectedCategory === category.label
          ? 'bg-blue-800 text-blue-100 ripple'
          : null
      "
    >
      {{ category.label }}
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
    const { categories } = useCategories();
    const { activeInterfaces } = useInterfaces();
    const { addProduct, getProduct, getProductsLength } = useProducts();
    const addingScreen = ref(null);
    const productState = reactive({
      label: "",
      prices: {},
      description: "",
      imageUrl: "",
      selectedCategory: "",
      position: null
    });

    if (props.productId === "new") {
      console.log(props);
      productState.label = "";
      productState.prices = {};
      productState.description = "";
      productState.selectedCategory = "";
      productState.imageUrl = "";
      productState.position = getProductsLength() + 1;
    } else {
      const product = getProduct(props.productId);
      productState.label = product.label;
      productState.prices = product.prices;
      productState.description = product.description;
      productState.selectedCategory = product.category;
      productState.imageUrl = product.imageUrl;
      productState.position = product.position;
    }

    function submitForm() {
      let payload = {
        label: productState.label,
        prices: productState.prices,
        description: productState.description,
        position: productState.position,
        imageUrl: productState.imageUrl,
        category: productState.selectedCategory
      };
      if (props.productId === "new") {
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
