import { reactive, ref } from "vue";

const interfaces = reactive({
  i001: {
    label: "MASALAR",
    useKey: "table",
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
