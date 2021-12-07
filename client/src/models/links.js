import axios from "axios";
import { action, thunk } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";
import hash from "../utils/hash";
import { encryptFile } from "../utils/crypto";

const links = {
  link: {},
  links: [],
  loading: true,
  // Actions
  setLink: action((state, payload) => {
    state.link = payload;
  }),
  setLinks: action((state, payload) => {
    state.links = payload;
    state.loading = false;
  }),
  addLink: action((state, payload) => {
    state.links.push(payload);
  }),
  changeLink: action((state, payload) => {
    state.links = state.links.map((link) => {
      if (payload.id === link.id) {
        return payload;
      } else {
        return link;
      }
    });
  }),
  removeLink: action((state, payload) => {
    state.links = state.links.filter(
      (link) => link.passHash !== payload.passHash
    );
  }),
  // Thunks
  getLinks: thunk(async (actions, payload) => {
    try {
      // Network Request Simulated
      const res = await axios.get("/api/link");

      actions.setLinks(res.data);
      return true;
    } catch (err) {
      return false;
    }
  }),
  saveLink: thunk(async (actions, payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const password = uuidv4();
      const passHash = await hash(password);
      const encryptedFile = await encryptFile(payload.image, password);

      console.log(password);

      const body = {
        passHash: passHash,
        desc: payload.desc,
        expireDate: payload.expireDate,
        data: encryptedFile,
      };

      const res = await axios.post("/api/link", body, config);
      let link = res.data;

      link.password = password;
      actions.setLink(link);
      actions.addLink(link);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }),
  editLink: thunk(async (actions, payload) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      desc: payload.desc,
      expireDate: payload.expireDate,
      passHash: payload.passHash,
    };

    try {
      const res = await axios.put("/api/link", body, config);
      actions.changeLink(res.data);
      return true;
    } catch (err) {
      return false;
    }
  }),
  deleteLink: thunk(async (actions, payload) => {
    try {
      await axios.delete(`/api/link/${payload.passHash}`);

      actions.removeLink(payload);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }),
};

export default links;
