<template>
  <div>
    <button ripple>AYARLAR</button>
    <button ripple>ÜRÜNLER</button>
    <button ripple>RAPORLAR</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss" scoped>
button {
  @apply w-full p-0 m-0 h-full bg-blue-900 text-blue-200 text-xl;
}

div {
  @apply h-12 w-screen flex items-center justify-around;
}
</style>
