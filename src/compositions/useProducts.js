import { reactive, ref, computed, onMounted } from "vue";
import { huid } from "@/compositions/useFunctions";
import { db } from "./useFunctions";

let products = reactive({
  // uid1: {
  //   label: "Pilav Üstü Tavuk",
  //   position: 0,
  //   subCategory: "Pilav Üstü",
  //   category: "ANA ÜRÜN",
  //   description:
  //     "Sıradanlıktan türemiş sıfat sevindi beğendim ama un değirmeni tv sokaklarda dergi otobüs uzattı dergi. Sıradanlıktan balıkhaneye sıradanlıktan adresini ışık dağılımı çakıl salladı göze çarpan patlıcan.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1562967915-92ae0c320a01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3152&q=80",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // },
  // uid2: {
  //   label: "Pilav Üstü Kanat",
  //   position: 1,
  //   subCategory: "Pilav Üstü",
  //   category: "ANA ÜRÜN",
  //   description:
  //     "Batarya kutusu salladı anlamsız göze çarpan şafak hesap makinesi ekşili çorba dışarı çıktılar sıla gülüyorum adanaya sıradanlıktan sokaklarda. Koşuyorlar bahar masanın sıla lambadaki çünkü yazın gördüm bundan dolayı adanaya.",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1543826173-1beeb97525d8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3252&q=80",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // },
  // uid3: {
  //   label: "Pilav Üstü But",
  //   position: 2,
  //   subCategory: "Pilav Üstü",
  //   category: "ANA ÜRÜN",
  //   description:
  //     "Gördüm gazete sıla dışarı çıktılar bilgisayarı. Sinema öyle ki gülüyorum teldeki un değirmeni sinema orta camisi mutlu oldular yapacakmış mıknatıslı okuma sayfası duyulmamış sıla.      ",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1596474252697-5a9b32e959e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2251&q=80",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // },
  // uid4: {
  //   label: "1ON7 Dürüm",
  //   position: 3,
  //   subCategory: "Dürüm",
  //   category: "ANA ÜRÜN",
  //   description:
  //     "Lambadaki dergi orta camisi dergi ve kapının kulu gördüm sıla sıla çobanın orta camisi salladı sinema. Gülüyorum ışık dağılımı koştum göze çarpan çobanın un değirmeni ekşili çorba domates lambadaki ötekinden dolayı.      ",
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // },
  // uid5: {
  //   label: "Kutu Pepsi Cola",
  //   position: 4,
  //   subCategory: "Kutu",
  //   category: "İÇECEK",
  //   description:
  //     "Sıradanlıktan hesap makinesi düşünüyor adresini otobüs lambadaki karşıdakine.",
  //   imageUrl: "",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // },
  // uid6: {
  //   label: "Şişe Fanta",
  //   position: 5,
  //   subCategory: "Litrelik",
  //   category: "İÇECEK",
  //   description:
  //     "Adresini otobüs lambadaki karşıdakine gitti cezbelendi lakin.",
  //   imageUrl: "",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // },
  // uid7: {
  //   label: "Keşkül",
  //   position: 6,
  //   subCategory: "Sütlü",
  //   category: "TATLI",
  //   description: "",
  //   imageUrl: "",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // },
  // uid8: {
  //   label: "Baklava",
  //   position: 8,
  //   subCategory: "Şerbetli",
  //   category: "TATLI",
  //   description: "",
  //   imageUrl: "",
  //   prices: {
  //     table: 20.5,
  //     phone: 20.5,
  //     website: 21.5,
  //     yemeksepeti: 21.5,
  //     takeaway: 20
  //   }
  // }
});

export default function useProduct() {
  db.changes({ since: "now", live: true, include_docs: true }).on(
    "change",
    function(change) {
      // yo, something changed!
      console.log("db changes", change.deleted);
      db.allDocs({
        startkey: "product_",
        endkey: "product_\uffff",
        include_docs: true
      }).then(function(items) {
        console.log("db changes", change.deleted);
        if (change.deleted) {
          console.log("delelelelelelele");
          delete products[change.id];
        }
        items.rows.forEach(item => (products[item.id] = item.doc.product));
      });
    }
  );

  Object.filter = (obj, predicate) =>
    Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

  const sharedFilter = ref(null);
  function addProduct(payload) {
    products[payload._id] = payload.product;
    db.put(payload);
    db.allDocs({ include_docs: true });
  }
  onMounted(() => {
    db.allDocs({
      startkey: "product_",
      endkey: "product_\uffff",
      include_docs: true
    }).then(function(items) {
      items.rows.forEach(item => (products[item.id] = item.doc.product));
    });
  });

  function updateProduct(payload) {
    db.get(payload._id)
      .then(function(doc) {
        return db.put({
          _id: doc._id,
          _rev: doc._rev,
          product: payload.product
        });
      })
      .then(function() {
        // handle response
        products[payload._id] = payload.product;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function deleteProduct(productId) {
    db.get(productId)
      .then(function(doc) {
        return db.remove(doc);
      })
      .then(function() {
        delete products[productId];
      });
  }

  function getProduct(productId) {
    return products[productId];
  }

  function getProductsLength() {
    return Object.keys(products).length;
  }

  function filterProducts(selectedSubOrCat) {
    sharedFilter.value = selectedSubOrCat;
  }
  const filteredProducts = computed(() => {
    let filteredItems = {};
    Object.keys(products).forEach(item => {
      if (sharedFilter.value !== null) {
        if (
          products[item].subCategory === sharedFilter.value ||
          products[item].category === sharedFilter.value
        ) {
          filteredItems[item] = products[item];
        }
      } else {
        filteredItems = products;
      }
    });
    return filteredItems;
  });

  function addOption(payload) {
    let newId = "option" + 1 + huid(3);
    console.log(products[payload.productId]);
    if (products[payload.productId].options) {
      newId =
        "option" +
        (Object.keys(products[payload.productId].options).length + 1) +
        huid(3);
    } else {
      products[payload.productId].options = {};
    }
    if (payload.optionId !== "") {
      newId = payload.optionId;
    }
    products[payload.productId].options[newId] = {
      title: payload.title,
      isMultiple: payload.isMultiple,
      hasPrice: payload.hasPrice,
      choices: payload.choices
    };
    db.get(payload.productId)
      .then(function(doc) {
        console.log("doc", doc);
        return db.put({
          _id: doc._id,
          _rev: doc._rev,
          product: products[payload.productId]
        });
      })
      .then(function(response) {
        // handle response
        console.log("response", response);
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  function deleteOption(productId, optionId) {
    delete products[productId].options[optionId];
    if (Object.values(products[productId].options).length === 0) {
      delete products[productId].options;
    }
  }

  return {
    filteredProducts,
    filterProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductsLength,
    addOption,
    deleteOption
  };
}
