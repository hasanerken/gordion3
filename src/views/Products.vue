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
            <div
              class="px-3 cursor-pointer"
              @click="openEditProduct(key, product.label)"
            >
              {{ product.label }}
            </div>
            <div class="flex flex-row">
              <div
                class="flex items-center justify-center w-10 h-10 px-3 rounded-full cursor-pointer hover:bg-myred-400"
                @click="openOptionsScreen(key, product.label)"
              >
                +
              </div>
              <div
                class="flex items-center justify-center w-10 h-10 px-3 rounded-full cursor-pointer hover:bg-myred-400"
                @click="deleteProduct(key)"
              >
                &times;
              </div>
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
          <div v-if="product.options" class="p-1 text-sm text-left">
            <div class="text-xs font-bold">SEÇENEKLER:</div>
            <div
              v-for="(option, optionKey) in product.options"
              :key="optionKey"
              class="flex flex-row flex-wrap items-center p-1 border-b border-red-100 cursor-pointer"
              @click="openOptionsScreen(key, product.label, optionKey)"
            >
              <div class="m-1">{{ option.title.toLocaleUpperCase() }}:</div>
              <div class="m-1">
                ({{ option.isMultiple ? "Çoklu Seçim" : "Tek Seçim" }})
              </div>
              <div
                v-for="(choice, choiceKey) in option.choices"
                :key="choiceKey"
                class="px-2 py-1 m-1 text-white bg-blue-400 rounded-full"
              >
                {{ choice.label }}
                <span v-if="choice.price > 0">
                  ({{ turkishLira(choice.price) }})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RoundedButton @run-add-screen="openAddProduct" />

    <!-- PRODUCT FORM -->
    <modal ref="addingScreen" :title="`Ürün Ekle/Düzenle - ${sharedLabel}`">
      <template v-slot:body>
        <ProductForm :product-id="sharedKey" @close-modal="closeModal" />
      </template>
    </modal>

    <!-- OPTIONS FORM -->
    <modal
      ref="optionsScreen"
      :title="`Seçenek Ekle/Düzenle - ${sharedOptionId}`"
    >
      <template v-slot:body>
        <OptionsForm
          :product-id="sharedKey"
          :option-id="sharedOptionId"
          @close-modal="closeModal"
        />
      </template>
    </modal>
  </div>
</template>

<script>
import PriceBanner from "@/components/PriceBanner";
import RoundedButton from "@/components/RoundedButton";
import ProductForm from "@/components/ProductForm";
import OptionsForm from "@/components/OptionsForm";
import ProductCategories from "@/components/ProductCategories";
import useProducts from "@/compositions/useProducts";
import { ref } from "vue";
export default {
  components: {
    PriceBanner,
    RoundedButton,
    ProductCategories,
    ProductForm,
    OptionsForm
  },
  setup() {
    const { filteredProducts, deleteProduct, filterProducts } = useProducts();
    const addingScreen = ref(null);
    const optionsScreen = ref(null);
    const sharedKey = ref(null);
    const sharedLabel = ref(null);
    const sharedOptionId = ref(null);

    function openAddProduct() {
      sharedKey.value = "new";
      addingScreen.value.openModal();
    }

    function openEditProduct(key, label) {
      sharedKey.value = key;
      sharedLabel.value = label;
      addingScreen.value.openModal();
    }
    function closeModal() {
      addingScreen.value.closeModal();
      optionsScreen.value.closeModal();
    }

    function openOptionsScreen(key, label, optionId) {
      sharedKey.value = key;
      sharedLabel.value = label;
      sharedOptionId.value = optionId;
      optionsScreen.value.openModal();
    }

    return {
      filteredProducts,
      filterProducts,
      openAddProduct,
      openEditProduct,
      deleteProduct,
      addingScreen,
      optionsScreen,
      openOptionsScreen,
      closeModal,
      sharedKey,
      sharedLabel,
      sharedOptionId
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
