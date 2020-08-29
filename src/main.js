import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/main.css";
import VueRippler from "vue-rippler";
import Modal from "./components/Modal.vue";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueRippler);
app.component("modal", Modal);

app.mount("#app");
