import { action, thunk } from "easy-peasy";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const user = {
  token: "",
  email: "",
  isAuthenticated: false,
  loading: true,
  setToken: action((state, payload) => {
    state.token = payload.token;

    if (payload.token) {
      state.isAuthenticated = true;
    }

    setAuthToken(payload.token);
  }),
  setUser: action((state, payload) => {
    state.email = payload.email;
    state.loading = false;
  }),
  logout: action((state, payload) => {
    setAuthToken();
    state.token = "";
    state.email = "";
    state.isAuthenticated = false;
    state.loading = false;
  }),
  // thunks
  login: thunk(async (actions, payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      email: payload.email,
      password: payload.password,
    };

    try {
      const res = await axios.post("/api/user/login", body, config);
      actions.setToken(res.data);

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

    const body = {
      email: payload.email,
      password: payload.password,
    };

    try {
      let res = await axios.post("/api/user/signup", body, config);
      actions.setToken(res.data);

      return true;
    } catch (err) {
      return false;
    }
  }),
  getUser: thunk(async (actions, payload) => {
    try {
      const res = await axios.get("/api/user");
      const user = {
        email: res.data.email,
        isAuthenticated: true,
      };

      actions.setUser(user);
      return true;
    } catch (err) {
      console.log(err);
      const user = {
        email: "",
        isAuthenticated: false,
      };

      actions.setUser(user);
      return false;
    }
  }),
  deleteUser: thunk(async (actions, _) => {
    try {
      await axios.delete("/api/user");
      actions.logout();
      return true;
    } catch (err) {
      return false;
    }
  }),
};

export default user;
