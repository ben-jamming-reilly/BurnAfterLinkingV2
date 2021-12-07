import { createStore, persist } from "easy-peasy";

import links from "./links";
import user from "./user";
import file from "./file";

const store = createStore({
  links: links,
  user: persist(user),
  file: file,
});

export default store;
