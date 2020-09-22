<template>
  <div class="flex flex-row h-12">
    <div
      v-for="(category, key) in categories"
      :key="key"
      class="flex items-center justify-center w-full p-4 text-2xl text-white uppercase bg-blue-800 cursor-pointer shadow-innerlg"
      @click="selectCategory(category.label)"
    >
      {{ category.label }}
    </div>
  </div>
  <div class="flex flex-row h-12">
    <div
      v-for="(sub, index) in filteredSubCategories"
      :key="index"
      class="flex items-center justify-center w-full text-xl text-white bg-blue-600 cursor-pointer shadow-innerlg"
      @click="selectSubCategory(sub.label)"
    >
      {{ sub.label }}
    </div>
  </div>
</template>

<script>
import useCategories from "@/compositions/useCategories";
import { computed, ref } from "vue";
export default {
  emits: ["category-selected", "sub-selected"],
  setup(props, { emit }) {
    const { categories, subCategories } = useCategories();
    const sharedLabel = ref(null);

    const filteredSubCategories = computed(() => {
      let filteredItems = {};
      Object.keys(subCategories).forEach(item => {
        if (
          sharedLabel.value !== null &&
          subCategories[item].parentLabel === sharedLabel.value
        ) {
          filteredItems[item] = subCategories[item];
        }
      });
      return filteredItems;
    });

    function selectCategory(categoryLabel) {
      sharedLabel.value = categoryLabel;
      emit("category-selected", categoryLabel);
    }

    function selectSubCategory(subCategoryLabel) {
      emit("sub-selected", subCategoryLabel);
    }
    return {
      categories,
      subCategories,
      selectCategory,
      selectSubCategory,
      filteredSubCategories
    };
  }
};
</script>

<style lang="postcss" scoped></style>
