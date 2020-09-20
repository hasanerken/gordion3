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
      <div v-for="(product, key) in products" :key="key">
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
        <div class="w-full pt-4">
          <textarea
            data-autoresize
            class="bg-red-600 text-area focus:outline-none focus:bg-white focus:border-myred-400"
            ref="description"
            rows="1"
            placeholder="Ürün Tanımı"
            v-model="description"
          />
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
      sharedKey: ""
    };
  },
  computed: {
    ...Vuex.mapState("productStore", ["categories"]),
    ...Vuex.mapState("productStore", ["products"]),
    ...Vuex.mapGetters("productStore", ["getProductDetails"]),
    ...Vuex.mapGetters(["getActiveInterfaces"])
  },
  methods: {
    ...Vuex.mapActions("productStore", [
      "addProduct",
      "deleteProduct",
      "editProduct"
    ]),
    openAddProduct() {
      this.$refs.addingScreen.openModal();
    },
    openEditProduct(key) {
      this.label = this.getProductDetails(key).label;
      this.prices = this.getProductDetails(key).prices;
      this.description = this.getProductDetails(key).description;
      this.imageUrl = this.getProductDetails(key).imageUrl;
      this.sharedKey = key;
      this.$refs.addingScreen.openModal();
    },
    submitForm() {
      let payload = {
        id: this.huid(8),
        label: this.label,
        prices: this.prices,
        description: this.description,
        imageUrl: this.imageUrl
      };
      if (this.sharedKey) {
        this.editProduct({ id: this.sharedKey, updates: payload });
      } else {
        this.addProduct(payload);
      }
      this.$refs.addingScreen.closeModal();
    },
    
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
textarea {
  box-sizing: border-box;
  resize: none;
}
</style>
