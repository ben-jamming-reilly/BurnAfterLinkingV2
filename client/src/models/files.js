import { action, thunk } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";
import hash from "../utils/hash";

const TestFile = {};

const files = {
  blob: null,
  key: null,
  loading: false,
  setFile: action((state, payload) => {
    state.file = payload;
  }),
  getFile: thunk(async (actions, payload) => {
    try {
      // Network Request Simulated
      await new Promise((resolve) => setTimeout(resolve, 2000));

      actions.setFile();
    } catch (err) {}
  }),
};

export default files;
