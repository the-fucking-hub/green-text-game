import {createApp} from "vue";
import "./style.css";
import App from "./App.vue";
import greenText from "@library/global";
import "./store.js";
greenText.vue_app = createApp(App);
greenText.vue_app.use({
    install: (app) => {
        app.config.globalProperties.$greenText = greenText;
    }
});

greenText.vue_root = greenText.vue_app.mount("#app");

greenText.vue_app.config.globalProperties.$store = greenText.store;
