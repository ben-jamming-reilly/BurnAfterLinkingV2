import { action, thunk } from "easy-peasy";
import axios from "axios";

const user = {
  email: "",
  token: "",
  lastLogin: Date.now(),
  isAuthenticated: false,
  loading: false,
  // actions
  setUser: action((state, payload) => {
    state.email = payload.email;
    state.token = "<JWT>";
    state.isAuthenticated = true;
    state.loading = false;
  }),
  // thunks
  login: thunk(async (actions, payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {};

    try {
      const res = await axios.post("/api/user/login", body, config);

      return true;
    } catch (err) {
      return false;
    }
  }),
  signup: thunk(async (actions, payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {};
    try {
      const res = await axios.post("/api/user/signup", body, config);

      return true;
    } catch (err) {
      return false;
    }
  }),
  getUser: thunk(async (actions, payload) => {
    console.log(payload);
    try {
      // Network Request Simulated
      const res = await axios.get();

      actions.setUser(payload);
      return true;
    } catch (err) {
      return false;
    }
  }),
};

export default user;
