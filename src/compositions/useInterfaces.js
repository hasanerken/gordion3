import { reactive, ref } from "vue";

const interfaces = reactive({
  table: {
    label: "MASALAR",
    useKey: "table",
    active: true
  },
  phone: {
    label: "TELEFON",
    active: true,
    useKey: "phone"
  },
  website: {
    label: "WEB SİTESİ",
    active: true,
    useKey: "website"
  },
  yemeksepeti: {
    label: "YEMEK SEPETİ",
    active: false,
    useKey: "yemeksepeti"
  },
  takeaway: {
    label: "AL-GÖTÜR",
    active: true,
    useKey: "takeaway"
  }
});

export default function useInterfaces() {
  let objectsArray = Object.values(interfaces);
  const activeInterfaces = ref([]);

  objectsArray.forEach(item => {
    if (item.active === true) {
      activeInterfaces.value.push({ label: item.label, useKey: item.useKey });
    }
  });

  return { interfaces, activeInterfaces };
}
