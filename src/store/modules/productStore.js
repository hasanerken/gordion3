
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

const state = () => ({
  categories: {
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
  },
  subCategories: {
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
  },
  products: {
    uid1: {
      label: "Pilav Üstü Tavuk",
      position: 0,
      subCategory: "Pilav Üstü",
      category: "ANA ÜRÜN", // MENÜ OLUŞTURMADA YARARLANDIĞIMIZ GRUPLAMA. BURAYA EKLENEN BİR ÜRÜN MENÜYE EKLENEBİİLR OLACAK.
      description:
        "Sıradanlıktan türemiş sıfat sevindi beğendim ama un değirmeni tv sokaklarda dergi otobüs uzattı dergi. Sıradanlıktan balıkhaneye sıradanlıktan adresini ışık dağılımı çakıl salladı göze çarpan patlıcan.",
      imageUrl:
        "https://images.unsplash.com/photo-1562967915-92ae0c320a01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3152&q=80",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    },
    uid2: {
      label: "Pilav Üstü Kanat",
      position: 1,
      subCategory: "Pilav Üstü",
      category: "ANA ÜRÜN",
      description:
        "Batarya kutusu salladı anlamsız göze çarpan şafak hesap makinesi ekşili çorba dışarı çıktılar sıla gülüyorum adanaya sıradanlıktan sokaklarda. Koşuyorlar bahar masanın sıla lambadaki çünkü yazın gördüm bundan dolayı adanaya.",
      imageUrl:
        "https://images.unsplash.com/photo-1543826173-1beeb97525d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3252&q=80",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    },
    uid3: {
      label: "Pilav Üstü But",
      position: 2,
      subCategory: "Pilav Üstü",
      category: "ANA ÜRÜN",
      description:
        "Gördüm gazete sıla dışarı çıktılar bilgisayarı. Sinema öyle ki gülüyorum teldeki un değirmeni sinema orta camisi mutlu oldular yapacakmış mıknatıslı okuma sayfası duyulmamış sıla.      ",
      imageUrl:
        "https://images.unsplash.com/photo-1596474252697-5a9b32e959e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    },
    uid4: {
      label: "1ON7 Dürüm",
      position: 3,
      subCategory: "Dürüm",
      category: "ANA ÜRÜN",
      description:
        "Lambadaki dergi orta camisi dergi ve kapının kulu gördüm sıla sıla çobanın orta camisi salladı sinema. Gülüyorum ışık dağılımı koştum göze çarpan çobanın un değirmeni ekşili çorba domates lambadaki ötekinden dolayı.      ",
      imageUrl:
        "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    },
    uid5: {
      label: "Kutu Pepsi Cola",
      position: 4,
      subCategory: "Kutu",
      category: "İÇECEK",
      description:
        "Sıradanlıktan hesap makinesi düşünüyor adresini otobüs lambadaki karşıdakine.",
      imageUrl: "",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    },
    uid6: {
      label: "Şişe Fanta",
      position: 5,
      subCategory: "İçecek",
      category: "İÇECEK",
      description:
        "Adresini otobüs lambadaki karşıdakine gitti cezbelendi lakin.",
      imageUrl: "",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    },
    uid7: {
      label: "Keşkül",
      position: 6,
      subCategory: "Tatlılar",
      category: "TATLI",
      description: "",
      imageUrl: "",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    },
    uid8: {
      label: "Kazandibi",
      position: 8,
      subCategory: "Tatlılar",
      category: "TATLI",
      description: "",
      imageUrl: "",
      prices: {
        table: 20.5,
        phone: 20.5,
        website: 21.5,
        yemeksepeti: 21.5,
        takeaway: 20
      }
    }
  },
  menus: {
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
  }
});

const getters = {
  getProductDetails: state => id => {
    return state.products[id];
  },
  getProductsByGroup: state => categoryLabel => {
    console.log("catLabel", categoryLabel)
    let selectedProducts = Object.filter(
      state.products,
      product => product.category === categoryLabel
    );
    return selectedProducts;
  },
  getMenuByKey: state => useKey => {
    return state.menus[useKey];
  }
};

const mutations = {
  ADD_MENU: (state, payload) => {
    state.menus[payload.id] = payload.menu;
  },
  DELETE_MENU: (state, menuId) => {
    delete state.menus[menuId];
  },
  EDIT_MENU: (state, payload) => {
    Object.assign(state.menus[payload.id], payload.updates);
  },
  ADD_PRODUCT: (state, payload) => {
    state.products[payload.id] = payload.product;
  },
  DELETE_PRODUCT: (state, productId) => {
    delete state.products[productId];
  },
  EDIT_PRODUCT: (state, payload) => {
    Object.assign(state.products[payload.id], payload.updates);
  }
};

const actions = {
  addMenu({ commit }, payload) {
    console.log(payload)
    commit("ADD_MENU", payload);
  },
  deleteMenu({ commit }, payload) {
    commit("DELETE_MENU", payload);
  },
  editMenu({ commit }, payload) {
    console.log(payload);

    commit("EDIT_MENU", payload);
  },
  addProduct({ commit }, payload) {
    commit("ADD_PRODUCT", payload);
  },
  deleteProduct({ commit }, payload) {
    console.log(payload);
    commit("DELETE_PRODUCT", payload);
  },
  editProduct({ commit }, payload) {
    console.log(payload);

    commit("EDIT_PRODUCT", payload);
  }
};

export default { namespaced: true, state, getters, mutations, actions };
