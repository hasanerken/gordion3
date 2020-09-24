import { reactive, ref, computed } from "vue";

const categories = reactive({
  food: {
    label: "ANA ÜRÜN",
    position: 1
  },
  salad: {
    label: "SALATA",
    position: 6
  },
  drink: {
    label: "İÇECEK",
    position: 2
  },
  dessert: {
    label: "TATLI",
    position: 3
  },
  extra: {
    label: "EKSTRA",
    position: 4
  },
  appetiser: {
    label: "APERATİF",
    position: 5
  }
});

const subCategories = reactive({
  uid099: {
    parentLabel: "ANA ÜRÜN",
    label: "Dürüm",
    position: 1
  },
  uid019: {
    parentLabel: "ANA ÜRÜN",
    label: "Pilav Üstü",
    position: 2
  },
  uid029: {
    parentLabel: "ANA ÜRÜN",
    label: "Kiloluk",
    position: 3
  },
  uid049: {
    parentLabel: "ANA ÜRÜN",
    label: "Diyet",
    position: 4
  },
  uid0929: {
    parentLabel: "İÇECEK",
    label: "Kutu",
    position: 5
  },
  uid093: {
    parentLabel: "İÇECEK",
    label: "Litrelik",
    position: 6
  },
  uid023: {
    parentLabel: "TATLI",
    label: "Sütlü",
    position: 7
  },
  uid024: {
    parentLabel: "TATLI",
    label: "Şerbetli",
    position: 8
  }
});

export default function useCategories() {
  const sharedLabel = ref(null);

  function selectCategory(categoryLabel) {
    console.log("catlab", categoryLabel);
    sharedLabel.value = categoryLabel;
  }

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

  return { categories, subCategories, selectCategory, filteredSubCategories };
}
