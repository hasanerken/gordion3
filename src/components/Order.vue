<template>
  <div class="h-full my-2 cursor-pointer">
    <div
      ripple
      class="w-full flex justify-between items-center bg-blue-700 text-blue-200 rounded-t-lg px-4"
    >
      <div>{{ no }}</div>
      <div class="text-xl text-white">
        99.45 TL
      </div>
    </div>
    <div
      id="fullText"
      class="w-full bg-gray-300 h-full rounded-b-lg"
      @click="printDiv('fullText')"
    >
      <div class="print:text-red-600 print:w-40 print:text-xs print:p-2">
        İtem 3 Loremrounded-t-lg Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Odio doloribus at ea perferendis voluptatibus,
        perspiciatis a fuga, quos laboriosam numquam voluptas expedita velit
        sapiente inventore nihil vitae aspernatur deleniti beatae.
      </div>
    </div>
    <button @click="printDiv('fullText')">Print Me</button>
  </div>
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

<style lang="postcss" scoped></style>
