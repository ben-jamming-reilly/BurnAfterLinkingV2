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

      console.log(payload);
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
