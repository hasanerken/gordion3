import { reactive, ref, computed, onMounted } from "vue";
import { db } from "./useFunctions";

const categories = reactive({});
const subCategories = reactive({});

export default function useCategories() {
  const sharedLabel = ref(null);

  function getCategories() {
    db.allDocs({
      startkey: "category_",
      endkey: "category_\uffff",
      include_docs: true
    }).then(function(items) {
      items.rows.forEach(item => (categories[item.doc._id] = item.doc));
    });
  }

  function getSubCategories() {
    db.allDocs({
      startkey: "subcategory_",
      endkey: "subcategory_\uffff",
      include_docs: true
    }).then(function(items) {
      items.rows.forEach(item => (subCategories[item.id] = item.doc));
    });

    // db.allDocs("subCategories").then(function(items) {
    //   Object.keys(items).forEach((key) => {
    //     if (items[key].type === "subcategory") {
    //       subCategories.value[key] = items[key];
    //     }
    //   });
    // });
  }

  onMounted(() => {
    console.log("1");
    getCategories();
    getSubCategories();
    console.log(categories);
  });

  function selectCategory(categoryLabel) {
    sharedLabel.value = categoryLabel;
  }

  const filteredSubCategories = computed(() => {
    let filteredItems = {};
    Object.keys(subCategories).forEach(item => {
      if (
        sharedLabel.value !== null &&
        subCategories[item].parent === sharedLabel.value
      ) {
        filteredItems[item] = subCategories[item];
      }
    });
    return filteredItems;
  });

  return {
    getCategories,
    getSubCategories,
    categories,
    subCategories,
    selectCategory,
    filteredSubCategories
  };
}
