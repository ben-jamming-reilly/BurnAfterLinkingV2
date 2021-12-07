import axios from "axios";
import { action, thunk } from "easy-peasy";
import { decryptFile } from "../utils/crypto";
import hash from "../utils/hash";

const file = {
  url: null,
  file: null,
  key: null,
  loading: true,
  setFile: action((state, payload) => {
    state.url = URL.createObjectURL(payload);
    state.file = payload;
    state.loading = false;
  }),
  getFile: thunk(async (actions, payload) => {
    try {
      const h = await hash(payload);
      const res = await axios.get(`/api/file/${h}`, {
        captcha: payload.captcha,
      });

      const link = res.data;
      const file = await decryptFile(link.data, payload);
      console.log(file);

      actions.setFile(file);
    } catch (err) {
      alert(err.response.data.errors[0].msg);
      return false;
    }
  }),
};

export default file;
