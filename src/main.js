import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import Modal from "./components/Modal.vue";
import MyPlugin from "./plugins/plugin";

const app = createApp(App);

app.use(router);
app.use(MyPlugin);

app.component("modal", Modal);

app.mount("#app");
