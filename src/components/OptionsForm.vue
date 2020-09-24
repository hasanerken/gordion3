<template>
  <div>
    <input
      class="w-full col-span-4 focus:outline-none focus:bg-white focus:border-myred-400"
      type="text"
      placeholder="Seçenek Adı"
      v-model="title"
    />
    <div
      class="flex justify-around w-full p-2 my-2 font-bold rounded-md flex-round"
    >
      <Switch
        label="'Ücretli'"
        :checked="hasPrice"
        @update:checked="updatePriceOption"
      />
      <Switch
        :label="'Çoklu seçim'"
        :checked="isMultiple"
        @update:checked="updateMultipleOption"
      />
    </div>
    <div class="grid grid-cols-12 gap-2 mb-8">
      <input
        class=" focus:outline-none focus:bg-white focus:border-myred-400"
        :class="hasPrice ? 'col-span-8' : 'col-span-10'"
        type="text"
        placeholder="Seçenek ..."
        v-model="label"
      />
      <input
        v-if="hasPrice"
        class="col-span-2 focus:outline-none focus:bg-white focus:border-myred-400"
        type="number"
        step="0.1"
        placeholder="Tutar ..."
        @focus="price = ''"
        v-model="price"
      />
      <button
        class="col-span-2 text-white rounded-md bg-myred-500"
        @click="addChoice"
      >
        EKLE
      </button>
      <div
        v-if="hasError"
        class="flex justify-start col-span-12 ml-2 text-myred-500"
      >
        Lütfen seçenek bilgisini giriniz.
      </div>
    </div>
    <div
      v-for="(choice, key) in choices"
      :key="key"
      class="grid items-center grid-cols-12 gap-4 p-2 m-2 font-bold text-black rounded-full bg-myred-100"
    >
      <div v-if="showText[key]" class="col-span-7 px-2 py-1 text-left">
        {{ choice.label }}
      </div>
      <div v-else class="col-span-7 px-2 py-1 text-left">
        <input
          class="w-full focus:outline-none focus:bg-white focus:border-myred-400"
          type="text"
          placeholder="Seçenek ..."
          v-model="choices[key].label"
        />
      </div>
      <div v-if="showText[key]" class="col-span-2 px-2 py-1 text-left">
        {{ turkishLira(choice.price) }}
      </div>
      <div v-else class="col-span-2">
        <input
          class="w-full focus:outline-none focus:bg-white focus:border-myred-400"
          type="number"
          v-model="choices[key].price"
        />
      </div>
      <div
        class="flex items-center justify-center w-10 h-10 col-span-1 text-xl text-left rounded-full hover:bg-myred-100"
      >
        <svg
          v-if="showText[key]"
          class="h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="showText[key] = false"
        >
          <path
            d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"
          />
        </svg>
        <svg
          v-else
          class="h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="showText[key] = true"
        >
          <path
            d="M0 2C0 .9.9 0 2 0h14l4 4v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5 0v6h10V2H5zm6 1h3v4h-3V3z"
          />
        </svg>
      </div>
      <div
        class="flex items-center justify-center w-10 h-10 col-span-1 text-xl text-left rounded-full hover:bg-myred-100"
      >
        <svg
          class="h-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          @click="deleteChoice(key)"
        >
          <path
            d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"
          />
        </svg>
      </div>
    </div>
  </div>
  <div>
    <div class="grid justify-between grid-flow-row grid-cols-2 gap-3 text-md">
      <button class="text-white bg-myred-500" @click="runDeleteOption">
        SEÇENEĞİ SİL
      </button>
      <button class="text-white bg-blue-800 " @click="runAddOption">
        KAYDET
      </button>
    </div>
  </div>
</template>

<script>
import Switch from "@/components/Switch.vue";
import { reactive, toRefs } from "vue";
import useProducts from "@/compositions/useProducts";
import { huid } from "@/compositions/useFunctions";
export default {
  props: {
    productId: {
      type: String,
      default: ""
    },
    optionId: {
      type: String,
      default: ""
    }
  },
  emits: ["close-modal"],
  components: {
    Switch
  },
  setup(props, { emit }) {
    const { addOption, deleteOption, getProduct } = useProducts();
    console.log(props);
    const optionState = reactive({
      title: props.optionId
        ? getProduct(props.productId).options[props.optionId].title
        : "",
      hasPrice: props.optionId
        ? getProduct(props.productId).options[props.optionId].hasPrice
        : true,
      isMultiple: props.optionId
        ? getProduct(props.productId).options[props.optionId].isMultiple
        : true,
      choices: props.optionId
        ? getProduct(props.productId).options[props.optionId].choices
        : {}
    });

    const choiceState = reactive({
      label: "",
      price: 0,
      hasError: false,
      showText: {}
    });

    function addChoice() {
      let newNumber = "ch" + Object.keys(optionState.choices).length + huid(3);
      if (choiceState.label !== "") {
        optionState.choices[newNumber] = {
          label: choiceState.label,
          price: choiceState.price
        };
        choiceState.label = "";
        choiceState.price = 0;
        choiceState.hasError = false;
        choiceState.showText[newNumber] = true;
      } else {
        choiceState.hasError = true;
      }
    }

    function deleteChoice(choiceId) {
      delete optionState.choices[choiceId];
    }

    // düzeltilecek
    function runAddOption() {
      let payload = {
        productId: props.productId,
        optionId: props.optionId,
        title: optionState.title,
        isMultiple: optionState.isMultiple,
        choices: optionState.choices,
        hasPrice: optionState.hasPrice
      };
      addOption(payload);
      console.log("vue", payload);
      optionState.title = "";
      optionState.isMultiple = true;
      optionState.hasPrice = true;
      optionState.choices = {};
      emit("close-modal");
    }

    function updatePriceOption(payload) {
      optionState.hasPrice = payload;
      if (optionState.hasPrice === false) {
        optionState.price = 0;
      }
    }

    function updateMultipleOption(payload) {
      optionState.isMultiple = payload;
    }

    function runDeleteOption() {
      delete deleteOption(props.productId, props.optionId);
      emit("close-modal");
    }

    return {
      ...toRefs(optionState),
      ...toRefs(choiceState),
      updatePriceOption,
      updateMultipleOption,
      runAddOption,
      addChoice,
      runDeleteOption,
      deleteChoice
    };
  }
};
</script>

<style lang="postcss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  display: none;
}

button {
  @apply w-full p-3 text-lg rounded-sm shadow-lg;
}
</style>
