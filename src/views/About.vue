<template>
  <div>
    <button
      class="mx-auto btn btn--primary"
      @click="$refs.modalName.openModal()"
    >
      Open modal
    </button>
    <modal ref="modalName">
      <template v-slot:header>
        Title
      </template>

      <template v-slot:body>
        Body
      </template>

      <template v-slot:footer>
        Footer11
        <!-- <div class="flex flex-row text-lg">
          <button class="w-1/2" @click="$refs.modalName.closeModal()">
            Cancel
          </button>
          <button class="w-1/2" @click="$refs.modalName.closeModal()">
            <div class="p-3 text-blue-200 bg-blue-800 rounded-lg">
              Save
            </div>
          </button>
        </div> -->
      </template>
    </modal>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped></style>
