<template>
  <div class="h-screen bg-mygray-100">
    <div class="flex flex-row h-12">
      <div
        v-for="(category, key) in categories"
        :key="key"
        class="flex items-center justify-center w-full p-4 text-2xl text-white uppercase bg-blue-800 shadow-xl"
      >
        {{ category.label }}
      </div>
    </div>
    <div class="grid justify-center grid-cols-2 gap-2 mb-12">
      <div v-for="(product, key) in sortObject(products)" :key="key">
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

    <!-- BU MODAL YENİ ÜRÜNLERİN OLUŞTURULDUĞU KISIMDIR. -->
    <modal ref="addingScreen">
      <template v-slot:header>
        <div>
          ÜRÜN EKLE
        </div>
      </template>
      <template v-slot:body>
        <div class="mb-6 md:flex md:items-center">
          <div class="w-full pb-2">
            <input
              class="focus:outline-none focus:bg-white focus:border-myred-400"
              type="text"
              placeholder="Ürün Adı"
              v-model="label"
            />
          </div>
        </div>
        <div class="flex flex-row items-center">
          <div
            v-for="(item, key) in getActiveInterfaces"
            :key="key"
            class="m-1"
          >
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
      </template>
      <template v-slot:footer>
        <div
          class="grid justify-between grid-flow-row grid-cols-2 gap-3 text-md"
        >
          <button class="text-white bg-myred-500">
            SİL
          </button>
          <button class="text-white bg-blue-800 " @click="submitForm">
            KAYDET
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Vuex from "vuex";
import PriceBanner from "@/components/PriceBanner";
import RoundedButton from "@/components/RoundedButton";
import { useStore } from "vuex";
import { reactive, toRefs, ref } from "vue";
export default {
  components: {
    PriceBanner,
    RoundedButton
  },
  data() {
    return {
      label: "",
      prices: {},
      description: "",
      imageUrl: "",
      sharedKey: "",
      selectedCategory: ""
    };
  },
  setup() {
    const store = useStore();
    const categories = store.state.productStore.categories;
    const products = store.state.productStore.products;
    const addingScreen = ref(null);
    const productState = reactive({
      label: "",
      prices: {},
      description: "",
      imageUrl: "",
      sharedKey: "",
      selectedCategory: "",
      position: null
    });

    function openAddProduct() {
      productState.label = "";
      productState.prices = {};
      productState.description = "";
      productState.selectedCategory = "";
      productState.imageUrl = "";
      productState.sharedKey = "new";
      productState.position = Object.keys(products).length; // Bu kısım position input açıldıktan sonra düzeltilecek.
      addingScreen.value.openModal();
    }

    return {
      products,
      categories,
      ...toRefs(productState),
      openAddProduct,
      addingScreen
    };
  },
  computed: {
    //...Vuex.mapState("productStore", ["categories", "products"]),
    ...Vuex.mapGetters(["getActiveInterfaces"])
  },
  methods: {
    ...Vuex.mapActions("productStore", [
      "addProduct",
      "deleteProduct",
      "editProduct"
    ]),

    openEditProduct(key) {
      console.log(this.products[key]);
      this.label = this.products[key].label;
      this.prices = this.products[key].prices;
      this.description = this.products[key].description;
      this.selectedCategory = this.products[key].category;
      this.imageUrl = this.products[key].imageUrl;
      this.sharedKey = key;
      this.$refs.addingScreen.openModal();
    },
    submitForm() {
      let payload = {
        label: this.label,
        prices: this.prices,
        description: this.description,
        imageUrl: this.imageUrl,
        category: this.selectedCategory
      };
      if (this.sharedKey === "new") {
        this.addProduct({ id: this.huid(8), product: payload });
      } else {
        this.editProduct({ id: this.sharedKey, updates: payload });
      }
      this.$refs.addingScreen.closeModal();
    }
  },
  beforeMount() {}
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
