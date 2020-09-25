import { reactive } from "vue";

const menus = reactive({
  muid01: {
    label: "Pilav Üstü Menü",
    content: {
      food: { ids: ["uid1"], quantity: 1 },
      drink: { ids: ["uid5", "uid6"], quantity: 1 },
      dessert: { ids: ["uid7", "uid8"], quantity: 1 }
    },
    prices: {
      table: 35.5,
      phone: 35.5,
      website: 35.5,
      yemeksepeti: 35.5,
      takeaway: 35.5
    }
  },
  muid02: {
    label: "Kanat Menü",
    content: {
      food: { ids: ["uid2"], quantity: 1 },
      drink: { ids: ["uid5", "uid6"], quantity: 1 },
      dessert: { ids: ["uid7", "uid8"], quantity: 1 }
    },
    prices: {
      table: 25.5,
      phone: 25.5,
      website: 25.5,
      yemeksepeti: 25.5,
      takeaway: 25.5
    }
  },
  muid03: {
    label: "But Menü",
    content: {
      food: { ids: ["uid3"], quantity: 1 },
      drink: { ids: ["uid5", "uid6"], quantity: 1 },
      dessert: { ids: ["uid7", "uid8", "uid5"], quantity: 1 }
    },
    prices: {
      table: 15.5,
      phone: 15.5,
      website: 15.5,
      yemeksepeti: 15.5,
      takeaway: 15.5
    }
  }
});

export default function useMenu() {
  return { menus };
}
