<template>
  <div
    class="h-full px-4 py-2 my-2 cursor-pointer"
    @click="$refs.modalName.openModal()"
  >
    <div
      ripple
      class="flex items-center justify-between w-full px-4 text-blue-200 bg-blue-700 rounded-t-smß"
    >
      <div>{{ no }}</div>
      <div class="text-xl text-white">
        99.45 TL
      </div>
    </div>
    <div class="w-full h-full bg-gray-300 rounded-b-lg">
      İtem 3 Loremrounded-t-lg Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Odio doloribus at ea perferendis voluptatibus,
      perspiciatis a fuga, quos laboriosam numquam voluptas expedita velit
      sapiente inventore nihil vitae aspernatur deleniti beatae.
    </div>
  </div>

  <modal ref="modalName">
    <template v-slot:header> Title: {{ no }} </template>

    <template v-slot:body>
      <div id="fullText" class="w-full h-full rounded-b-lg">
        <div class="print:text-green-600 print:w-40 print:text-xs print:p-2">
          İtem 3 Loremrounded-t-lg Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Odio doloribus at ea perferendis voluptatibus,
          perspiciatis a fuga, quos laboriosam numquam voluptas expedita velit
          sapiente inventore nihil vitae aspernatur deleniti beatae.
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <div class="grid justify-between grid-flow-row grid-cols-2 gap-3 text-md">
        <button class="text-white bg-blue-800 " @click="printDiv('fullText')">
          MUTFAK ÇIKTISI
        </button>
        <button class="text-white bg-blue-800 " @click="printDiv('fullText')">
          KURYE ÇIKTISI
        </button>
        <button
          ripple
          class="text-white bg-myred-500"
          @click="printDiv('fullText')"
        >
          HESAP KAPAMA
        </button>
        <button
          class="text-gray-900 bg-mygray-300"
          @click="printDiv('fullText')"
        >
          İPTAL
        </button>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  props: {
    no: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {};
  },
  methods: {
    printDiv(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();

      document.body.innerHTML = originalContents;
      location.reload();
    }
  }
};
</script>

<style lang="postcss" scoped>
button {
  @apply w-full p-5 text-lg rounded-sm shadow-lg font-bold;
}
</style>
