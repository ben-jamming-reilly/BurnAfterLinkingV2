import axios from "axios";
import { action, thunk } from "easy-peasy";
// import { v4 as uuidv4 } from "uuid";
import hash from "../utils/hash";

const TestFile = {};

const files = {
  blob: null,
  key: null,
  loading: false,
  setFile: action((state, payload) => {
    state.blob = payload;
    state.loading = false;
  }),
  getFile: thunk(async (actions, payload) => {
    try {
      const h = await hash(payload.password);
      // Network Request Simulated
      const res = await axios.get(`/api/file/${h}`, {
        captcha: payload.captcha,
      });

      actions.setFile(res.data);
      console.log(res.data);
    } catch (err) {
      return false;
    }
  }),
};

export default files;
