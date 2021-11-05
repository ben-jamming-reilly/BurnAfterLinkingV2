import { action, thunk } from "easy-peasy";

const user = {
  email: "",
  token: "",
  lastLogin: Date.now(),
  isAuthenticated: true,
  loading: false,
  // actions
  setUser: action((state, payload) => {
    state.email = payload.email;
    state.token = "<JWT>";
    state.isAuthenticated = true;
    state.loading = false;
  }),
  // thunks
  getUser: thunk(async (actions, payload) => {
    console.log(payload);
    try {
      // Network Request Simulated
      await new Promise((resolve) => setTimeout(resolve, 2000));

      actions.setUser(payload);
      return true;
    } catch (err) {
      return false;
    }
  }),
};

export default user;
