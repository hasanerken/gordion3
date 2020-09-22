import { reactive } from "vue";

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
    parentLabel: "Ana Ürünler",
    label: "Dürüm",
    position: 1
  },
  uid019: {
    parentLabel: "Ana Ürünler",
    label: "Çevirme",
    position: 2
  },
  uid029: {
    parentLabel: "Ana Ürünler",
    label: "Kiloluk",
    position: 3
  },
  uid049: {
    parentLabel: "Ana Ürünler",
    label: "Diyet",
    position: 4
  },
  uid0929: {
    parentLabel: "İçecekler",
    label: "Kutu",
    position: 5
  },
  uid093: {
    parentLabel: "İçecekler",
    label: "Litrelik",
    position: 6
  },
  uid023: {
    parentLabel: "Tatlılar",
    label: "Sütlü",
    position: 7
  },
  uid024: {
    parentLabel: "Tatlılar",
    label: "Şerbetli",
    position: 8
  }
});

export default function useCategories() {
    
  return { categories, subCategories };
}
