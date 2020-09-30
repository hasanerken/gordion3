<template>
  <div class="flex flex-row h-12">
    <div
      v-for="(category, key) in categories"
      :key="key"
      class="flex items-center justify-center w-full p-4 text-xs text-white uppercase bg-blue-800 cursor-pointer md:text-2xl shadow-innerlg"
      @click="runSelectCategory(category.useKey)"
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
export default {
  emits: ["category-selected", "sub-selected"],
  setup(props, { emit }) {
    const {
      categories,
      subCategories,
      selectCategory,
      filteredSubCategories
    } = useCategories();

    function runSelectCategory(categoryLabel) {
      console.log(categoryLabel);
      selectCategory(categoryLabel);
      emit("category-selected", categoryLabel);
    }

    function selectSubCategory(subCategoryLabel) {
      emit("sub-selected", subCategoryLabel);
    }
    return {
      categories,
      subCategories,
      runSelectCategory,
      selectSubCategory,
      filteredSubCategories
    };
  }
};
</script>

<style lang="postcss" scoped></style>
