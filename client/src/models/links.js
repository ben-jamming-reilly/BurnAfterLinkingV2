import axios from "axios";
import { action, thunk } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";
import hash from "../utils/hash";

const d = new Date();

const TestLinks = [
  {
    id: uuidv4(),
    desc: "This is a picture of a super funny dog",
    expireDate: d.toUTCString(),
    passHash:
      "0ee5227097c81013a7e04ca6366f2b6c5b6b27dbb09045c5d49f91d985ddd1f9",
  },
  {
    id: uuidv4(),
    desc: "A picture of my social security card",
    expireDate: d.toUTCString(),
    passHash:
      "0ecce3ad876a553d6eda6fa8839451eaa4ebcd3fe9f52f512e842d6b5146d048",
  },
  {
    id: uuidv4(),
    desc: "A picutre of a bank statement",
    expireDate: d.toUTCString(),
    passHash:
      "c5ef584306b1220dc560b273c436e57a6c67226c0f739bdcfcfbefe25ba1a4ff",
  },
];

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
    state.links = state.links.filter((link) => link.id !== payload.id);
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
        "Content-Type": "multipart/form-data",
      },
    };

    const password = uuidv4();
    const passHash = await hash(password);

    let link = {
      passHash: passHash,
      desc: payload.desc,
      expireDate: payload.expireDate,
    };

    let body = new FormData();
    body.append("file", payload.image);
    body.append("data", JSON.stringify(link));

    try {
      await axios.post("/api/link", body, config);

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
      // Network Request Simulated
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
