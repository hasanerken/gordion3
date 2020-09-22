import { reactive } from "vue";

const products = reactive({
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
    subCategory: "Litrelik",
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
    subCategory: "Sütlü",
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
    label: "Baklava",
    position: 8,
    subCategory: "Şerbetli",
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
});

export default function useProduct() {
  function addProduct(payload) {
    products[payload.id] = payload.product;
  }

  function deleteProduct(productId) {
    delete products[productId];
  }

  function getProduct(productId) {
    return products[productId];
  }

  function getProductsLength() {
    return Object.keys(products).length;
  }

  return { products, addProduct, deleteProduct, getProduct, getProductsLength };
}
