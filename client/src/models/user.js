import { action, thunk } from "easy-peasy";

const user = {
  email: "",
  token: "",
  lastLogin: Date.now(),
  isAuthenticated: true,
  loading: false,
};

export default user;
