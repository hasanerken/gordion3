<template>
  <div id="app" class="flex flex-col justify-between h-screen sm:ml-24">
    <router-view />
    <Navbar class="fixed bottom-0 left-0 w-24" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { onMounted } from "vue";
import { db, remoteDB } from "./compositions/useFunctions";

export default {
  components: {
    Navbar
  },
  setup() {
    onMounted(() => {
      remoteDB.setMaxListeners(20);
      db.setMaxListeners(20);
      db.sync(remoteDB, {
        live: true,
        retry: true,
        continuous: true
      })
        .on("change", function(change) {
          // yo, something changed!
          console.log(change);
          console.log("Content Has Changed!");
        })
        .on("paused", function(info) {
          // replication was paused, usually because of a lost connection
          console.log(info);
        })
        .on("active", function(info) {
          // replication was resumed
          console.log(info);
        })
        .on("error", function(err) {
          // totally unhandled error (shouldn't happen)
          console.log(err);
        });
      db.allDocs({ include_docs: true });
    });
    return {};
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
