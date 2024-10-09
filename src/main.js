import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/vuex"; // Adjusted path to your vuex.js file
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Initialize the app
const app = createApp(App);
// Load user from localStorage if present
const user = localStorage.getItem("user");
if (user) {
  store.commit("setUser", JSON.parse(user));
}
// Register plugins
app.use(router);
app.use(store);

// Mount the app
app.mount("#app");
