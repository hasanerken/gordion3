import { createStore } from "vuex";
import productStore from "./modules/productStore";

export default createStore({
  state: {
    interfaces: {
      i001: {
        label: "MASALAR",
        useKey: "table", // BU PROPERTYDEN MENU OLUŞTURURKEN FİYATLARI FARKLILLAŞTIRMADA YARARLANIYORUZ.
        active: true
      },
      i002: {
        label: "TELEFON",
        active: true,
        useKey: "phone"
      },
      i003: {
        label: "WEB SİTESİ",
        active: true,
        useKey: "website"
      },
      i004: {
        label: "YEMEK SEPETİ",
        active: true,
        useKey: "yemeksepeti"
      },
      i005: {
        label: "AL-GÖTÜR",
        active: true,
        useKey: "takeaway"
      }
    }
  },
  getters: {
    getActiveInterfaces: state => {
      let x = Object.values(state.interfaces);
      let y = [];
      x.forEach(item => {
        if (item.active === true) {
          y.push({ label: item.label, useKey: item.useKey });
        }
      });
      return y;
    },
    getInterfaceLabel: state => value => {
      return Object.values(state.interfaces).filter(
        item => item.useKey === value
      )[0];
    }
  },
  mutations: {},
  actions: {},
  modules: {
    productStore
  }
});
