<template>
  <main>
    <div
      class="flex flex-row items-center justify-center w-full h-12 mb-4 text-2xl text-white bg-blue-800"
    >
      MENÜLER
    </div>
    <div class="grid justify-center grid-cols-2 gap-2 m-2 ">
      <div v-for="(menu, key) in menus" :key="key" class="bg-pink-100 ">
        <div class="divide-y bg-myred-100 divide-mypink-400">
          <div
            class="flex justify-between p-2 text-2xl text-white bg-myred-500 "
          >
            <div class="px-3 cursor-pointer" @click="openEditMenu(key)">
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
              class="grid grid-cols-5"
            >
              <div v-if="content.ids.length > 0" class="col-span-1 text-left">
                {{ categories[index].label }}:
              </div>
              <div class="flex flex-row flex-wrap col-span-4">
                <span
                  v-for="(item, index) in content.ids"
                  :key="index"
                  class="flex flex-row rounded-sm"
                >
                  <span class="mx-1">
                    &bull;{{ getProductDetails(item).label }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RoundedButton @run-add-screen="openAddingScreen" />
    <!-- BU MODAL YENİ MENÜLERİN OLUŞTURULDUĞU KISIMDIR. -->
    <modal ref="addingScreen">
      <template v-slot:header>
        <div>
          MENÜ EKLE
        </div>
      </template>

      <template v-slot:body>
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
            <div
              v-for="(item, key) in getActiveInterfaces"
              :key="key"
              class="m-1"
            >
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
                  openAddMenuItem({ index: categoryKey, label: category.label })
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
                  {{ getProductDetails(item).label }}
                </div>
              </div>
            </div>
          </div>
        </form>
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

    <!-- MENÜ İÇERİSİNE YEMEK, İÇECEK VB. EKLEMELERİN YAPILDIĞI MODAL -->
    <modal ref="productSelector" :position="'second'">
      <template v-slot:header> EKLENECEK ÜRÜNÜ SEÇİN </template>
      <template v-slot:body class="bg-blue-300">
        <div
          id="fullText"
          class="grid w-full h-full grid-cols-2 gap-2 rounded-b-lg"
        >
          <div
            v-for="(product, index) in getProductsByGroup(
              selectedCategoryLabel
            )"
            :key="index"
            class=""
          >
            <div
              class="flex items-center justify-center w-full h-16 p-4 text-2xl bg-gray-400 rounded-md shadow-md cursor-pointer ripple "
              @click="addProduct({ id: index, value: product.label })"
            >
              {{ product.label }}
            </div>
          </div>
        </div>
      </template>
    </modal>
  </main>
</template>

<script>
import Vuex from "vuex";
import PriceBanner from "@/components/PriceBanner";
import RoundedButton from "@/components/RoundedButton";
//import Vue from "vue";
export default {
  data() {
    return {
      label: "",
      prices: {},
      selectedCategoryLabel: "",
      selectedGroupKey: "",
      content: {},
      sharedKey: ""
    };
  },
  mounted() {},
  components: {
    PriceBanner,
    RoundedButton
  },
  computed: {
    ...Vuex.mapState("productStore", [
      "products",
      "menus",
      "categories",
      "subCategories"
    ]),
    ...Vuex.mapGetters("productStore", [
      "getProductDetails",
      "getProductsByGroup",
      "getMenuByKey"
    ]),
    ...Vuex.mapGetters(["getActiveInterfaces"])
  },
  methods: {
    ...Vuex.mapActions("productStore", ["addMenu", "deleteMenu", "editMenu"]),
    openAddMenuItem(menu) {
      this.selectedCategoryLabel = menu.label;
      this.selectedGroupKey = menu.index;
      this.$refs.productSelector.openModal();
    },
    openAddingScreen() {
      this.sharedKey = "new";

      this.label = "";
      this.prices = {};
      this.content = {};
      Object.keys(this.sortObject(this.categories)).forEach((item) => {
        this.content[item] = {};
        this.content[item].ids = [];
      });
      console.log(this.content);

      this.$refs.addingScreen.openModal();
    },
    addProduct(item) {
      if (!this.content[this.selectedGroupKey].ids.includes(item.id)) {
        this.content[this.selectedGroupKey].ids.push(item.id);
      }
    },
    removeProductFromMenu(payload) {
      console.log(payload);
      console.log(this.content);
      this.content[payload.categoryKey].ids.splice(payload.idx, 1);
    },
    openEditMenu(key) {
      this.label = this.getMenuByKey(key).label;
      this.prices = this.getMenuByKey(key).prices;
      this.content = this.getMenuByKey(key).content;
      this.sharedKey = key;
      this.$refs.addingScreen.openModal();
    },
    submitForm() {
      let payload = {
        label: this.label,
        content: this.content,
        prices: this.prices
      };
      if (this.sharedKey === "new") {
        let uid = this.huid(8);
        this.addMenu({ id: uid, menu: payload });
      } else {
        this.editMenu({ id: this.sharedKey, updates: payload });
      }
      this.$refs.addingScreen.closeModal();
    }
  }
};
</script>

<style lang="postcss" scoped>
button {
  @apply w-full p-3 text-lg rounded-sm shadow-lg;
}
</style>
