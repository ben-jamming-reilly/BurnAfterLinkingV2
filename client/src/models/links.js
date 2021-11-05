import { action, thunk } from "easy-peasy";
import { v4 as uuidv4 } from "uuid";
import hash from "../utils/hash";

const d = new Date();

const TestLinks = [
  {
    id: uuidv4(),
    desc: "This is a picture of a super funny dog",
    expireDate: d.toUTCString(),
    passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
  },
  {
    id: uuidv4(),
    desc: "A picture of my social security card",
    expireDate: d.toUTCString(),
    passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
  },
  {
    id: uuidv4(),
    desc: "A picutre of a bank statement",
    expireDate: d.toUTCString(),
    passHash: `${(Math.random() + 1).toString(16).substring(7)}`,
  },
];

const links = {
  link: null,
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
    state.links = state.links.map((link) =>
      link.id === payload.id ? payload : link
    );
  }),
  removeLink: action((state, payload) => {
    state.links = state.links.filter((link) => link.id !== payload.id);
  }),
  // Thunks
  getLinks: thunk(async (actions, payload) => {
    try {
      // Network Request Simulated
      await new Promise((resolve) => setTimeout(resolve, 2000));

      actions.setLinks(TestLinks);
      return true;
    } catch (err) {
      return false;
    }
  }),
  saveLink: thunk(async (actions, payload) => {
    try {
      payload.expireDate = new Date(payload.expireDate);
      payload.password = uuidv4();

      payload.passHash = await hash(payload.password);

      // Network Request Simulated
      await new Promise((resolve) => setTimeout(resolve, 2000));
      payload.id = uuidv4();

      actions.setLink(payload);
      actions.addLink(payload);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }),
  editLink: thunk(async (actions, payload) => {
    try {
      // Network Request Simulated
      await new Promise((resolve) => setTimeout(resolve, 2000));

      actions.changeLink(payload);
      return true;
    } catch (err) {
      return false;
    }
  }),
  deleteLink: thunk(async (actions, payload) => {
    try {
      // Network Request Simulated
      await new Promise((resolve) => setTimeout(resolve, 2000));

      actions.removeLink(payload);
      return true;
    } catch (err) {
      return false;
    }
  }),
};

export default links;
