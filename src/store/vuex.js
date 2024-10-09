import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null, // null means not logged in
  },
  mutations: {
    setUser(state, user) {
      state.user = user; // Set the logged-in user
    },
    logout(state) {
      state.user = null; // Clear the user on logout
    },
  },
});

export default store;
