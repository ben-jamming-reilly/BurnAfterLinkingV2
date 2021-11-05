import { action, thunk } from "easy-peasy";

const user = {
  email: "",
  token: "",
  lastLogin: Date.now(),
  isAuthenticated: true,
  loading: false,
  // actions
  setUser: action((state, payload) => {}),
  // thunks
  getUser: thunk(async (actions, payload) => {
    try {
      // Network Request Simulated
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {}
  }),
};

export default user;
